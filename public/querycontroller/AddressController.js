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
//배송지 스키마
const AddressSchema = require('../scheme/addressSchema');

class AddressController {


    //@param {String} 매개변수는 문자형입니다.
    //배송지 정보를 반환합니다.
    static async getAddresses(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 배송지 리스트를 검색 시작');

                AddressSchema.find({
                    writer: clientIdx
                }, (err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(docs);

                }).lean().sort({'address.default': -1})
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 배송지 리스트를 검색 종료');
            }
        });
    }


    //@param {String} 매개변수는 문자형입니다.
    //배송지의 갯수를 세서 반환 (현재 배송지는 3개까지만 등록가능합니다.);
    static async checkAddressCount(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 유저의 배송지 개수 검색 시작');

                AddressSchema.count({
                    writer: clientIdx
                }, (err, doc) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(doc);
                })

            } catch (e) {
                reject('server');
            } finally {
                console.log('# 유저의 배송지 개수 검색 종료');
            }
        });
    }


    //배송지를 등록하는 메서드
    //@param {Object} 매개변수는 객체형입니다.

    static async saveAddress(address) {
        return new Promise((resolve, reject) => {

            try {
                console.log('# 배송지 저장 시작');

                address.save((err, doc) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(doc);
                });


            } catch (e) {
                reject('server');
            } finally {
                console.log('# 배송지 저장 종료');
            }
        });
    }


    /*
    * @param {String} 매개변수는 스트링형입니다.
    * */
    static async deleteAddress(addressIdx, clientIdx) {
        return new Promise((resolve, reject) => {

            try {
                console.log('# 배송지 삭제 시작');
                AddressSchema.findOneAndDelete({
                    _id: addressIdx,
                    writer: clientIdx
                }, (err, docs) => {
                    if (err) {
                        reject('server');
                    }
                    console.log(docs);
                    resolve(docs);
                });
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 배송지 삭제 종료');
            }
        });
    }

    /*
    * @param {String} 매개변수는 문자형입니다.
    * 기능 : default:true인 배송지를 삭제했을 경우 남아 있는 배송지 주소 중 오름차순으로 첫 번째 객체의 default값을 true로 바꿔줍니다.
    * */
    static async setDefaultTrueLeftOne(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 남아 있는 배송지를 기본값으로 설정합니다.');

                AddressSchema.findOneAndUpdate(
                    {
                        writer: clientIdx
                    }, {
                        $set: {
                            'address.default': true
                        }
                    }, {
                        new: true,
                        multi: true,
                        $setOnInsert: true
                    }).sort({'created': 1}).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }
                    console.log(docs);
                    resolve(docs);
                });
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 남아 있는 배송지를 기본값으로 설정 끝')

            }
        })
    }


    /*
    * @param {String} 매개변수는 문자형입니다.
    *
    *
    * */

    //배송지를 기본 배송지로 업데이트합니다. 다른 배송지들의 default는 false로 변경합니다.
    static async setDefaultAddress(addressIdx) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('# 배송지를 기본 배송지로 설정 시작');
                console.log(addressIdx);

                //배송지 업데이트
                await AddressSchema.updateMany({_id: {$ne: addressIdx}}, {$set: {'address.default': false}}, {multi: true, new: true}, ((err, docs) => {

                    if (err) {
                        reject('server');
                    }

                })); //저장하는 배송지를 제외한 나머지를 false로

                await AddressSchema.updateOne({
                    _id: addressIdx
                }, {
                    $set: {
                        'address.default': true
                    }
                }, {
                    new: true,
                    multi: true
                }, ((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(docs);
                }))
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 배송지를 기본 배송지로 설정 종료');
            }
        });
    }

    /*
    * @param clientIdx{String} 매개변수는 문자형입니다.
    * */

    //클라이언트의 모든 배송지 목록을 반환합니다.
    static async getClientAllAddresses(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 클라이언트의 배송지 반환 시작');
                AddressSchema.find({
                    writer: clientIdx
                }).sort({'address.default': 1}, ((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('# 처리 결과:', docs);
                        resolve(docs);
                    }
                }));
            } catch (e) {
                reject('server');
            } finally {
                console.log('# 클라이언트의 배송지 반환 종료');
            }
        });
    }


}//end class

module.exports = AddressController;



