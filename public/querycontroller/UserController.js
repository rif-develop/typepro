//아기 스키마
const Baby = require('../scheme/babySchema');
//유저 스키마
const User = require('../scheme/userSchema');
//crypto 모듛
const crypto = require('crypto');

class UserController {

    static async findOneClient(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 클라이언트의 정보 찾기 시작.');
                console.log('populate 했는지 체크하자(중요)');
                User.findOne({
                    _id: clientIdx
                }).populate('babies').lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs !== null) {
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

    //@param {String}
    //유저의 addresses 필드에  addresses를 참조하고 있는 oid를 추가한다.
    static async updateAddressId(clientIdx, addressIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 유저의 주소 필드에 _id삽입 시작');

                User.findByIdAndUpdate({
                    _id: clientIdx
                }, {
                    $push: {
                        'addresses': addressIdx
                    }
                }, {
                    new: true,
                    multi: true,
                    $setOnInsert: true,
                }).exec((err, doc) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(doc);
                })
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 유저의 주소 필드에 _id삽입 종료');
            }
        })
    }

    //배송지 주소를 삭제하는 메서드
    /*
    * @param {String} 매개변수는 문자형입니다.
    * */

    static async deleteAddressesOID(addressIdx, clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 배송지 OID를 삭제 시작');
                User.findByIdAndUpdate({
                    _id: clientIdx
                }, {
                    $pull: {
                        addresses: addressIdx
                    }
                }, {
                    new: true,
                    multi: true
                }).exec((err, doc) => {
                    if (err) {
                        reject('server')
                    }

                    resolve(doc);
                })
            } catch (e) {
                reject('server')
            } finally {
                console.log('# 배송지 OID를 삭제 끝.');

            }

        });
    }

    //비밀번호를 암호화 한다.
    //@param {password] 매개변수로 비밀번호
    static async generateCryptoPassword(password) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 비밀번호 암호화 시작');
                crypto.pbkdf2(password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, enPassword) => {
                    if (err) {
                        reject('server');
                    }
                    const encryptedPw = enPassword.toString(process.env.SECURITY_DIGEST);
                    resolve(encryptedPw)
                });

            } catch (e) {
                reject('server');

            } finally {
                console.log('# 비밀번호 암호화 종료');
            }
        });
    }


    //비밀번호가 맞는지 체크한다.
    static async checkIsClientPassword(email, password) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 비밀번호 맞는지 확인 시작');
                User.findOne({
                    email: email,
                    password: password
                }).lean().exec((err, doc) => {
                    if(err){
                        reject('server')
                    }
                    if(doc){
                        console.log('# 비밀번호 맞음');
                        resolve(true);
                    } else{
                        console.log('# 비밀번호 맞지 않음');
                        resolve(false);
                    }
                })
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 비밀번호 맞는지 확인 종료');
            }
        });
    }


    //일반 유저를 찾아 데이터베이스에서 삭제한다.(회원탈퇴)
    static async deleteOneClient_WARNING(clientIdx, email, password) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 유저 회원 탈퇴 처리 시작');
                User.findOneAndDelete({
                    _id: clientIdx,
                    email: email,
                    password: password
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(docs);
                })
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 유저 회원 탈퇴 처리 종료');
            }
        });
    }

}//end class

module.exports = UserController;