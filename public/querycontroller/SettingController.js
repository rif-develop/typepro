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

class SettingController {
    //단위 옵션이 적합한지 체크하는 함수
    static async checkAvailableUnitOption(unit) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 단위 옵션에 사용가능한 값인지 체크 시작');
                //enum
                const enumUnit = ['si', 'usa'];

                enumUnit.forEach((elem, i) => {
                    if (elem.indexOf(unit) !== -1) {
                        console.log('# 사용 가능한 옵션입니다.');
                        resolve(true)
                    }
                });

            } catch (e) {
                reject(false);
            } finally {
                console.log('# 단위 옵션에 사용가능한 값인지 체크 종료');

            }
        });
    }

    //유저의 단위 옵션을 변경합니다.
    //@param {String} 매개변수는 문자형입니다.
    static async setUnitOption(clientIdx, unit) {
        return new Promise((resolve, reject) => {
            try {
                User.findOneAndUpdate({
                    _id: clientIdx
                }, {
                    $set: {
                        'option.unit': unit
                    }
                }, {
                    new: true,
                    multi: true,
                    $setOnInsert: true
                }, (err, doc) => {
                    if (err) {
                        reject('server');
                    }

                    resolve(doc);
                })
            } catch (e) {
                reject('server');
            }
        });
    }

    //유저의 이메일 구독 옵션을 변경하는 메서드
    //@param {String} 매개변수는 문자형

    static async changeEmailSubscription(clientIdx, email) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 이메일 구독 옵션 변경 시작');


                User.findOne({
                    _id: clientIdx,
                    email: email
                }, (err, doc) => {
                    if (err) {
                        reject('server');
                    }

                    doc.option.emailSubscription = !doc.option.emailSubscription;

                    doc.save((err, doc) => {
                        if(err){
                            reject('server');
                        }
                        resolve(doc);
                    });
                });


            } catch (e) {
                reject('server');
            } finally {
                console.log('# 이메일 구독 옵션 변경 종료');
            }


        });
    }


}//end class

module.exports = SettingController;