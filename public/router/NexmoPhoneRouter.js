const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');
const Validations = require('../middleware/Validations');
const User = require('../scheme/userSchema');
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
}, {
    debug: true
});

const dev = process.env.NODE_ENV === 'development';
//핸드폰 인증 요청
router.post('/request', async (req, res) => {
    let verifyRequestId = null; // use in the check process

    try {
        //개발용 모드
        if (dev) {
            console.log('#현재 개발 모드로 진행 중.');
            return res.json({
                success: true,
                requestId: 123456
            });
        }


        const reqIsEmpty = Validations.isEmpty(req.body.phone) || Validations.isEmpty(req.body.country);
        //둘 중 하나라도 값ㄷ이 비어있다면
        if (reqIsEmpty) {
            return res.json({
                error: true,
                server: 'required'
            })
        }

        const clientPhone = req.body.phone;
        let clientCountry = req.body.country;

        if (clientCountry === 'ko') {
            clientCountry = {
                prefix: '82',
                brand: '육아의 넘버원 리틀원',
                country: 'KR',
                lg: 'ko-kr'
            };
        } else if (clientCountry === 'us') {
            clientCountry = {
                prefix: '1',
                brand: '육아의 넘버원 리틀원',
                country: 'US',
                lg: 'en-us'
            };
        } else if (clientCountry === 'ca') {
            clientCountry = {
                prefix: '1',
                brand: '육아의 넘버원 리틀원',
                country: 'CA',
                lg: 'en-ca'
            };
        } else if (clientCountry === 'ja') {
            clientCountry = {
                prefix: '81',
                brand: '육아의 넘버원 리틀원',
                country: 'JP',
                lg: 'ja-jp'
            };
        } else if (clientCountry === 'zh') {
            clientCountry = {
                prefix: '86',
                brand: '육아의 넘버원 리틀원',
                country: 'CN',
                lg: 'zh-cn'
            };
        } else if (clientCountry === 'tw') {
            clientCountry = {
                prefix: '886',
                brand: '육아의 넘버원 리틀원',
                country: 'TW',
                lg: 'zh-tw'
            };
        } else if (clientCountry === 'au') {
            clientCountry = {
                prefix: '61',
                brand: '육아의 넘버원 리틀원',
                country: 'AU',
                lg: 'en-au'
            };
        } else if (clientCountry === 'nz') {
            clientCountry = {
                prefix: '64',
                brand: '육아의 넘버원 리틀원',
                country: 'NZ',
                lg: 'en-nz'
            };
        } else if (clientCountry === 'uk') {
            clientCountry = {
                prefix: '44',
                brand: '육아의 넘버원 리틀원',
                country: 'GB',
                lg: 'en-gb'
            };
        } else if (clientCountry === 'sp') {
            clientCountry = {
                prefix: '65',
                brand: '육아의 넘버원 리틀원',
                country: 'SG',
                lg: 'en-sg'
            };
        }

        nexmo.verify.request({
            number: clientCountry.prefix + clientPhone,
            brand: clientCountry.brand || 'LITTLEONE',
            country: clientCountry.country,
            lg: clientCountry.lg //en-us, ja-jp, ko-kr, zh-cn
        }, (err, result) => {
            if (err) {
                throw err;
            } else {
                verifyRequestId = result.request_id;
                console.log('request_id', verifyRequestId);

                return res.json({
                    success: true,
                    requestId: verifyRequestId
                });
            }
        });
    } catch (e) {
        console.log('#넥스모 전화 인증 에러');
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        })

    } finally {
        console.log('처리 끝');
    }

});

//핸드폰 인증 요청 처리 후 데이터베이스에 사용자의 핸드폰 번호와 국가를 저장하는 라우
router.post('/clientupdate', async (req, res) => {
    console.log('# 핸드폰 인증번호 처리를 시작합니다.');
    try {

        console.log('# ----- 받은 값 ------  ');

        const requestId = req.body.requestId;
        const code = req.body.code;
        const country = req.body.country;
        const phone = req.body.phone;
        const clientIdx = req.body.clientIdx;

        console.log(req.body);
        console.log('# -----------------------');

        const isEmptyRequestId = Validations.isEmpty(requestId);
        const isEmptyCode = Validations.isEmpty(code) && code.length <= 4;
        const isEmptyPhone = Validations.isEmpty(phone);
        const isEmptyCountry = Validations.isEmpty(country);

        const acceptableCountry = ['us', 'ko', 'ja', 'zh', 'hk', 'sp', 'nz', 'au', 'ca', 'uk', 'tw'];

        const isCountry = acceptableCountry.indexOf(country) !== -1;

        const isPhone = Validations.checkNumber(phone);

        if (!isEmptyRequestId && !isEmptyCode && isCountry && isPhone && !isEmptyCountry && !isEmptyPhone) {
            //넥스모 코드 인증

            console.log('# 코드 인증 중..');
            await nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log('#핸드폰 인증 처리 결과');

                    console.log('# 스테이터스 값');
                    console.log(result.status);

                    //에러 핸들링
                    if (result.status === '16') {
                        return res.json({
                            error: true,
                            type: 'wrongCode'
                        })
                    } else if (result.status === '17') {
                        return res.json({
                            error: true,
                            type: 'manyRequest'
                        })
                    } else if (result.status === '6') {
                        return res.json({
                            error: true,
                            type: 'requestExpired'
                        });
                    } else if (result.status === '0') {
                        console.log('# 데이터 베이스 업데이트를 시작합니다.');
                        //디비에 핸드폰 인증 관련 정보 업데이트
                        User.findByIdAndUpdate({
                            _id: clientIdx
                        }, {
                            $set: {
                                phone: phone,
                                country: country
                            }
                        }, {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true

                        }).lean().exec((err, docs) => {
                            if (docs) {
                                console.log(docs);

                                console.log('# 데이터베이스 업데이트에 성공했습니다.');

                                //세션 갱신
                                req.session.key = docs;

                                return res.json({
                                    success: true,
                                });
                            }

                            if (err) {
                                throw err
                            }
                        });
                    } //end if~else
                }//if~else
            });//nexmo
        } else if (isEmptyPhone) {
            console.log('#전화번호가 비었음');
            return res.json({
                error: true,
                type: 'emptyPhone'
            });
        } else if (isEmptyRequestId) {
            console.log('# 리퀘스트 아이디가 빔');
            return res.json({
                error: true,
                type: 'emptyRequestId'
            });
        } else if (isEmptyCode) {
            console.log('# 코드가 빔');
            return res.json({
                error: true,
                type: 'emptyCode'
            });
        } else if (isEmptyCountry) {
            console.log('# 국가가 빔');
            return res.json({
                error: true,
                type: 'emptyCountry'
            });
        }


    } catch (e) {
        console.log('# 에러 핸들링');
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        })
    } finally {
        console.log('처리 끝')
    }
});


//비밀번호 찾기 인증 요청 라우터
router.post('/phone/password', async (req, res) => {
    //requestId, code, email, phoneNumber, country확인

    console.log('# 핸드폰 인증 비밀번호 찾기 인증 요청 확인');
    try {
        const code = req.body.code;
        const requestId = req.body.requestId;
        const email = req.body.email;
        const phone = req.body.phone;
        const country = req.body.country;

        const isEmptyCode = Validations.isEmpty(code);
        const isEmptyRequestId = Validations.isEmpty(requestId);
        const isEmptyEmail = Validations.isEmpty(email);
        const isEmptyPhone = Validations.isEmpty(phone);
        const isEmptyCountry = Validations.isEmpty(country);


        if (!isEmptyEmail && !isEmptyCode && !isEmptyRequestId && !isEmptyPhone && !isEmptyCountry) {

            console.log('# 모든 값들이 있음');

            await nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {

                if (err) {
                    console.log('# 인증과정에서 에러');
                    throw err
                } else {
                    console.log('#핸드폰 인증 결과');
                    console.log(result);


                    console.log('# 스테이터스 값');
                    console.log(result.status);

                    //에러 핸들링
                    if (result.status === '16') {
                        return res.json({
                            error: true,
                            type: 'wrongCode'
                        })
                    } else if (result.status === '17') {
                        return res.json({
                            error: true,
                            type: 'manyRequest'
                        })
                    } else if (result.status === '6') {
                        return res.json({
                            error: true,
                            type: 'requestExpired'
                        });
                    } else if (result.status === '0') {
                        console.log('#해당 이메일, 전화번호, 국가로 일치하는 유저가 있는지 확인합니다.');

                        User.findOne({
                            email: email,
                            phone: phone,
                            country: country
                        }).lean().exec((err, docs) => {
                            if (err) {
                                throw err;
                            }
                            if (docs) {
                                console.log('#일치하는 계정을 찾았습니다.');
                                console.log(docs);
                                return res.json({
                                    success: true, //비밀번호 변경 단계로 페이지 변경
                                    email: docs.email
                                });
                            } else {
                                console.log('# 일치하는 계정을 찾지 못했습니다.');
                                return res.json({
                                    success: false,
                                    email: false//이메일을 null에서 false로해서 상태 변화주기
                                });
                            }
                        });//데이터베이스 쿼리
                    } // end if~else
                } //end if~else

            });//nexmo check
        } else if (isEmptyCode) {
            console.log('#코드가 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyCode'
            });
        } else if (isEmptyCountry) {
            console.log('#국가가 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyCountry'
            });
        } else if (isEmptyPhone) {
            console.log('#전화 번호가 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyPhone'
            });
        } else if (isEmptyRequestId) {
            console.log('#리퀘스트 아이디가 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyRequestId'
            });
        } else if (isEmptyEmail) {
            console.log('# 이메일이 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyEmail'
            });
        }

    } catch (e) {
        console.log('왜 에러..');
        console.log(e);
        //인증 실패 리턴
        return res.json({
            success: false
        })
    }

});

//전화번호 인증 후 아이디 찾기 핸들링 라우터(아이디 찾기)

router.post('/phone/id', async (req, res) => {
    console.log('# 아이디 찾기 요청 시작.');
    console.log(req.body);
    //개발용

    try {

        const phone = req.body.phone;
        const requestId = req.body.requestId;
        const code = req.body.code;
        const country = req.body.country;

        const isEmptyPhone = Validations.isEmpty(phone);
        const isEmptyRequestId = Validations.isEmpty(requestId);
        const isEmptyCode = Validations.isEmpty(code);
        const isEmptyCountry = Validations.isEmpty(country);

        console.log(isEmptyPhone, isEmptyRequestId, isEmptyCode, isEmptyCountry);

        if (!isEmptyPhone && !isEmptyRequestId && !isEmptyCountry && !isEmptyCode) {
            console.log('# 전화번호가 있습니다.');

            //인증번호 확인
            await nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {

                if (err) {
                    console.log('# 인증과정에서 에러');
                    throw err
                } else {
                    console.log('#핸드폰 인증에 성공하였습니다.');
                    console.log(result);
                    //status 16 wrong code, status 17 잘못된 코드로 너무 많은 인증을 시도할 경우, 0은 인증 성공하였을 경우

                    console.log('# 스테이터스 값');
                    console.log(result.status);

                    //에러 핸들링
                    if (result.status === '16') {
                        return res.json({
                            error: true,
                            type: 'wrongCode'
                        })
                    } else if (result.status === '17') {
                        return res.json({
                            error: true,
                            type: 'manyRequest'
                        })
                    } else if (result.status === '6') {
                        return res.json({
                            error: true,
                            type: 'requestExpired'
                        });
                    } else if (result.status === '0') {
                        console.log('#핸드폰 인증에 성공하였습니다.');
                        // 인증 받은 전화번호를 가지고 있는 아이디가 있는지 찾아서 리턴
                        User.findOne({
                            phone: phone,
                            country: country
                        }).lean().exec((err, docs) => {
                            if (err) {
                                throw err;
                            }

                            if (docs) {
                                console.log('#찾은 아이디가 있습니다.');
                                console.log(docs.email);

                                return res.json({
                                    success: true,
                                    email: docs.email
                                });

                            } else {
                                console.log('#아이디가 없습니다.');
                                return res.json({
                                    success: false,
                                    email: false
                                });
                            }
                        });//query
                    }


                } //end if~else

            });


        } else if (isEmptyPhone) {
            console.log('#전화번호가 비었음');
            return res.json({
                error: true,
                type: 'emptyPhone'
            });
        } else if (isEmptyRequestId) {
            console.log('# 리퀘스트 아이디가 빔');
            return res.json({
                error: true,
                type: 'emptyRequestId'
            });
        } else if (isEmptyCode) {
            console.log('# 코드가 빔');
            return res.json({
                error: true,
                type: 'emptyCode'
            });
        } else if (isEmptyCountry) {
            console.log('# 국가가 빔');
            return res.json({
                error: true,
                type: 'emptyCountry'
            });
        }


    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        })
    }


});//아이디 찾기 라우터

//넥스모 인증 번호 재전송
router.post('/resend', async (req, res) => {
    console.log('#넥스모 전화인증 재전송 요청 시작');
    console.log(req.body);

    try {
        let verifyRequestId = null;

        const requestId = req.body.requestId;
        let clientCountry = req.body.country;
        const clientPhone = req.body.phone;

        const isEmptyRequestId = Validations.isEmpty(requestId);
        // 1. 먼저 기존에 보냈던 요청을 취소시킨다.

        if (clientCountry === 'ko') {
            clientCountry = {
                prefix: '82',
                brand: '육아의 넘버원 리틀원',
                country: 'KR',
                lg: 'ko-kr'
            };
        } else if (clientCountry === 'us') {
            clientCountry = {
                prefix: '1',
                brand: '육아의 넘버원 리틀원',
                country: 'US',
                lg: 'en-us'
            };
        } else if (clientCountry === 'ca') {
            clientCountry = {
                prefix: '1',
                brand: '육아의 넘버원 리틀원',
                country: 'CA',
                lg: 'en-ca'
            };
        } else if (clientCountry === 'ja') {
            clientCountry = {
                prefix: '81',
                brand: '육아의 넘버원 리틀원',
                country: 'JP',
                lg: 'ja-jp'
            };
        } else if (clientCountry === 'zh') {
            clientCountry = {
                prefix: '86',
                brand: '육아의 넘버원 리틀원',
                country: 'CN',
                lg: 'zh-cn'
            };
        } else if (clientCountry === 'tw') {
            clientCountry = {
                prefix: '886',
                brand: '육아의 넘버원 리틀원',
                country: 'TW',
                lg: 'zh-tw'
            };
        } else if (clientCountry === 'au') {
            clientCountry = {
                prefix: '61',
                brand: '육아의 넘버원 리틀원',
                country: 'AU',
                lg: 'en-au'
            };
        } else if (clientCountry === 'nz') {
            clientCountry = {
                prefix: '64',
                brand: '육아의 넘버원 리틀원',
                country: 'NZ',
                lg: 'en-nz'
            };
        } else if (clientCountry === 'uk') {
            clientCountry = {
                prefix: '44',
                brand: '육아의 넘버원 리틀원',
                country: 'GB',
                lg: 'en-gb'
            };
        } else if (clientCountry === 'sp') {
            clientCountry = {
                prefix: '65',
                brand: '육아의 넘버원 리틀원',
                country: 'SG',
                lg: 'en-sg'
            };
        }//end if~else


        if (isEmptyRequestId) {
            throw 'required';
        } else {
            await nexmo.verify.control({
                request_id: requestId,
                cmd: 'cancel'
            }, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log('# 기존 요청 취소가 완료되었습니다.');
                    console.log(result);
                }
            });//nexmo verify

            await nexmo.verify.request({
                number: clientCountry.prefix + clientPhone,
                brand: clientCountry.brand || 'LITTLEONE',
                country: clientCountry.country,
                lg: clientCountry.lg //en-us, ja-jp, ko-kr, zh-cn
            }, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    verifyRequestId = result.request_id;
                    console.log('request_id', verifyRequestId);
                    console.log('#재전송 요청 완료');
                    return res.json({
                        success: true,
                        requestId: verifyRequestId
                    });
                }
            });
        }


    } catch (e) {
        console.log(e);

        return res.json({
            error: true,
            type: e
        })
    } finally {
        console.log('#넥스모 전화 번호 재전송 요청 끝');
    }

});

module.exports = router;