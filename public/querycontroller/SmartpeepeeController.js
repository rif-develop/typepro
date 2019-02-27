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

class SmartpeepeeController {

    //이미 스마트피피의 데이터가 존재하는 회원인지 찾는다.
    static async findOneBaby(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                Smartpeepee.find({
                    owner: clientIdx,
                    baby: babyIdx
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('스마트피피 데이터가 존재하는 아이인지 데이터 확인');
                        resolve(docs);
                    }
                });
            } catch (e) {
                reject('server');
            }
        });
    }


    static async getLastDefecationTimeAndCount(specificDate,babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                // //검색조건 날짜 만약 24일의 데이터를 얻고 싶다면 ? gte 24~ lt 25
                const year = specificDate.getFullYear();
                const month = specificDate.getMonth();
                const date = specificDate.getDate() + 1;

                console.log('# 클라이언트 스마트 피피 데이터 검색 시작');
                Smartpeepee.aggregate([
                    {
                        $unwind: '$data' //배열 해체
                    },
                    {
                        $match: {
                            'data.createdAt': {
                                $gte: new Date(specificDate),
                                $lt: new Date(year, month, date)
                            },
                            'data.type': 'diaper', //defecation,diaper,
                            'data.baby':ObjectId(babyIdx)
                        },
                    },
                    { //그룹핑
                        $group: {
                            _id:'$data.baby', //_id는 항상 있어야 한다.,
                            count:{
                                $sum:1
                            },
                            lastDate: {
                                $last: "$data.createdAt",
                            } //마지막 날짜의 데이터
                        }
                    },
                ]).exec((err, docs) => {
                    if (err) {
                        reject('server')
                    }

                    console.log(docs);
                    if (docs !== null && docs !== undefined && docs.length > 0) {
                        //배변횟수
                        console.log(docs);
                        console.log('# 배변 횟수', docs[0].count);
                        console.log('# 마지막 배변 시간', docs[0].lastDate);

                        resolve(docs);

                    } else {
                        console.log('# 해당 날짜에는 피피 데이터가 없습니다.');
                        //아무런 데이터가 없으면 0을 반환합니다.
                        resolve(0);
                    }
                });
            } catch (e) {
                reject('server')
            } finally {
                console.log('# 클라이언트 스마트 피피 데이터 검색 종료');
            }
        });
    }


}//end class

module.exports = SmartpeepeeController;

