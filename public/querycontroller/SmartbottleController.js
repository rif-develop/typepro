//아기 스키마
const Baby = require('../scheme/babySchema');
//유저 스키마
const User = require('../scheme/userSchema');
//스마트보틀 스키마
const Smartbottle = require('../scheme/smartbottleSchema');

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
            } finally {

            }
        });
    }


}//end class

module.exports = SmartbottleController;