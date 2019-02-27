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

class SmarttempController {

    //이미 스마트보틀의 데이터가 존재하는 회원인지 찾는다.
    static async findOneBaby(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                Smarttemp.find({
                    owner: clientIdx,
                    baby: babyIdx
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('스마트템프 데이터가 존재하는 아이인지 데이터 확인');
                        resolve(docs);
                    }

                });
            } catch (e) {
                reject('server');
            }
        });
    }
}//end class

module.exports = SmarttempController;