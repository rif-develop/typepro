const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//아기 스키마
const Baby = require('../scheme/babySchema');
//유저 스키마
const User = require('../scheme/userSchema');
//스마트보틀 스키마
const Smartbottle = require('../scheme/smartbottleSchema');
//스마트피피 스키마
const Smartpeepee = require('../scheme/smartpeepeeSchema');
//스마트템프 스키마
const Smarttemp = require('../scheme/smarttempSchema');

//스마트 보틀 스키마

class SmartbottleController {

    //이미 스마트보틀의 데이터가 존재하는 회원인지 찾는다.
    static async findOneBaby(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                Smartbottle.find({
                    owner: clientIdx,
                    baby: babyIdx
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('스마트보틀 데이터가 존재하는 아이인지 데이터 확인');
                        resolve(docs);
                    }

                });
            } catch (e) {
                reject('server');
            }
        });
    }

    //마지막 수유시간을 찾아서 돌려주는 메서드
    static async getLastFeedingTime(specificDate, babyIdx) {
        return new Promise((resolve, reject) => {
            try {

                // //검색조건 날짜 만약 24일의 데이터를 얻고 싶다면 ? gte 24~ lt 25
                const year = specificDate.getFullYear();
                const month = specificDate.getMonth();
                const date = specificDate.getDate() + 1;

                console.log('# 스마트 보틀 데이터를 검색합니다.');
                 Smartbottle.aggregate([
                    {
                        $project:{ //이거 선언해놓고 아무것도 안 쓰면 디폴트 false임;0
                            _id:1,
                            data:1,
                            baby:1
                        }
                    },
                    {
                        $unwind:"$data"
                    },
                    {
                        $match:{ //매치한 데이터를 찾아서
                            'data.createdAt':{
                                $gte: new Date(specificDate),
                                $lt: new Date(year, month, date)
                            },
                            'data.baby':ObjectId(babyIdx)
                        }
                    },
                    { //그룹핑
                        $group: {
                            _id:'$data.baby',
                            lastDate: { $last: "$data.createdAt" } //마지막 날짜의 데이터
                        }
                    },
                ]).exec((err,docs)=>{
                    if(err){
                        reject('server');
                    }

                    if(docs.length >0){
                        resolve(docs[0].lastDate);
                    } else{
                        console.log('# 스마트 보틀 데이터가 없습니다.');
                        // console.log('#데이터가 없으면 0을 반환');
                        resolve(0);
                    }
                });
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 스마트 보틀 데이터 검색 종료');

            }
        });
    }


}//end class

module.exports = SmartbottleController;