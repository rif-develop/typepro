//아기 스키마
const Baby = require('../scheme/babySchema');
//유저 스키마
const User = require('../scheme/userSchema');

class UserController {

    static async findOneClient(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 클라이언트의 정보 찾기 시작.');
                console.log('populate 했는지 체크하자(중요)');
                User.findOne({
                    _id:clientIdx
                }).populate('babies').lean().exec((err,docs)=>{
                    if(err){
                        reject('server');
                    }

                    if(docs!== null){
                        console.log('#클라이언트를 찾았습니다.');
                        resolve(docs);
                    }
                    console.log('# 발견된 클라이언트가 없습니다.');
                })
            } catch (e) {
                reject('server');

            } finally {
                console.log('# 클라이언트의 정보 찾기 종료.');

            }
        });
    }


    //부모의 babies 스키마에 아이의 OID를 삽입한다.
    static async updateBabyId(parentIdx, babyIdx) {
        return new Promise((res, rej) => {
            try {
                console.log('# 아이의 oid를 부모의 데이터베이스에 업데이트합니다.');
                User.findOneAndUpdate({
                    _id: parentIdx,
                }, {
                    $push: {
                        babies: babyIdx,
                    }
                }, {
                    new: true,
                    multi: true,
                    $setOnInsert: true
                }).populate({path: 'babies', options: {sort: {'_id': 1}}}).lean().exec((err, docs) => {
                    if (err) {
                        throw 'server';
                    }

                    if (docs) {
                        console.log('# 쿼리 결과');
                        console.log(docs);
                        return res(docs);
                    }
                });
            } catch (e) {
                return e;
            }
        });
    }

    //유저의 babies 컬렉션에  babies를 참조하고 있는 oid를 삭제한다.(아이삭제시 같이 삭제해줌)
    static async deleteBabyOID(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 유저 아이 삭제 메서드 실행');
                User.findByIdAndUpdate({_id: clientIdx},
                    {$pull: {babies: babyIdx}},
                    {multi: true, new: true}).populate('babies').exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('# user babies oid 삭제 결과 ', docs);

                        resolve(docs);

                    }
                });
            } catch (e) {
                console.log(e);
                reject('server');
            } finally {
                console.log('# 유저 아이 삭제 메서드 종료');

            }
        });
    }


}//end class

module.exports = UserController;