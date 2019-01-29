const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');
const Validations = require('../middleware/Validations');
const User = require('../scheme/user');
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
}, {
    debug: true
});

//핸드폰 인증 요청
router.post('/request', async (req, res) => {
    let verifyRequestId = null; // use in the check process

    try {
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

        console.log(clientCountry);
        console.log(clientPhone);


        if (clientCountry === 'ko') {
            clientCountry = {
                prefix: '82',
                brand: '육아의 넘버원 리틀원',
                country: 'KO',
                lg: 'ko-kr'
            };
        } else if (clientCountry === 'us') {
            clientCountry = {
                prefix: '1',
                country: 'US',
                lg: 'en-us'
            };
        } else if (clientCountry === 'ca') {
            clientCountry = {
                prefix: '1',
                country: 'CA',
                lg: 'en-ca'
            };
        }

        console.log(clientCountry);


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

//핸드폰 인증 요청 처리
router.post('/codecheck', async (req, res) => {
    console.log('# 핸드폰 인증번호 처리를 시작합니다.');
    try {
        console.log('# ----- 받은 값 ------  ');

        const requestId = req.body.requestId;
        const code = req.body.code;
        const country = req.body.country;
        const phone = req.body.phone;
        const clientIdx = req.body.clientIdx;

        console.log(requestId);
        console.log(code);
        console.log(country);
        console.log(phone);
        console.log(clientIdx);
        console.log('# -----------------------');

        const isEmptyRequestId = Validations.isEmpty(requestId);
        const isEmptyCode = Validations.isEmpty(code) && code.length <= 4;

        const acceptableCountry = ['us', 'ko', 'ja', 'zh', 'hk', 'sp', 'nz', 'au', 'ca', 'uk', 'tw'];

        const isCountry = acceptableCountry.indexOf(country) !== -1;

        console.log(isCountry);
        const isPhone = Validations.checkNumber(phone);

        if (!isEmptyRequestId && !isEmptyCode && isCountry && isPhone) {
            //넥스모 코드 인증

            console.log('# 코드 인증 중..');
            nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log('#핸드폰 인증에 성공하였습니다.');

                    console.log(result);


                    //디비에 핸드폰 인증 관련 정보 업데이트

                    console.log('#데이터 베이스 업데이틑 시작합니다.');
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

                            //세션 갱신시켜주기

                            return res.json({
                                success: true,
                                phone: phone,
                                country: country,
                                clientIdx: clientIdx
                            });
                        }

                        if (err) {
                            throw err
                        }
                    });
                }
            });//nexmo
        } else {
            return res.json({
                success: false,
                error: true,
                type: 'required'
            })
        }


    } catch (e) {
        console.log('# 에러 핸들링');
        console.log(e);
        return res.json({
            success: false,
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

            nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {

                if (err) {
                    console.log('# 인증과정에서 에러');
                    throw err
                } else {
                    console.log('#핸드폰 인증에 성공하였습니다.');
                    console.log(result);
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
                            });
                        } else {
                            console.log('# 일치하는 계정을 찾지 못했습니다.');
                            return res.json({
                                error: true,
                                type: 'notFound'
                            });
                        }
                    })


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

//전화번호 인증 후 아이디 찾기 핸들링 라우터

router.post('/phone/id', async (req, res) => {
    console.log('#아이디를 찾기 요청 시작.');
    console.log(req.body);

    try {

        const phone = req.body.phone;
        const requestId = req.body.requestId;
        const code = req.body.code;
        const country = req.body.country;

        const isEmptyPhone = Validations.isEmpty(phone);
        const isEmptyRequestId = Validations.isEmpty(requestId);
        const isEmptyCode = Validations.isEmpty(code);
        const isEmptyCountry = Validations.isEmpty(country);

        if (!isEmptyPhone && !isEmptyRequestId && !isEmptyCountry && !isEmptyCode) {
            console.log('# 전화번호가 있습니다.');

            //인증번호 확인
            nexmo.verify.check({
                request_id: requestId,
                code: code
            }, (err, result) => {

                if (err) {
                    console.log('# 인증과정에서 에러');
                    throw err
                } else {
                    console.log('#핸드폰 인증에 성공하였습니다.');
                    console.log(result);

                    // 인증 받은 전화번호를 가지고 있는 아이디가 있는지 찾아서 리턴
                    User.findOne({
                        phone: phone,
                        country:country
                    }).lean().exec((err, docs) => {
                        if (err) {
                            throw err;
                        }

                        if (docs) {
                            console.log('#찾은 아이디가 있습니다.');
                            console.log(docs);

                            return res.json({
                                success: true,
                                email: docs.email
                            });

                        } else {
                            console.log('#아이디가 없습니다.');
                            return res.json({
                                error: true,
                                type: 'notFound'
                            });
                        }
                    });//query

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

//넥스모 문자 보내기
router.post('/sendsms', async (req, res) => {
    nexmo.message.sendSms(
        YOUR_VIRTUAL_NUMBER, '01083963007', '리틀원에서 김창현님이 이병규님에게 메시지를 보냈습니다.',
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );
});

module.exports = router;