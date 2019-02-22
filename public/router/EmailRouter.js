const express = require('express');
const router = express.Router();
const crypto = require('crypto');
let nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const generateHashToken = require('../middleware/generateHashToken');
const redis = require('redis');
const client = redis.createClient();
const validations = require('../middleware/Validations');

const User = require('../scheme/userSchema');


//url친화적인 토큰을 생성한다.
//레디스
// const redis = require('redis');
// const client = redis.createClient();
//템플릿 불러오기
const findPasswordTemplate = require('../emailTemplate/findPassword');

const transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
    rateLimit: 5
}));

//비밀번호 찾기 요청 라우터
router.post('/password', async (req, res) => {

    try {
        const receiver = req.body.email;

        const isEmptyEmail = validations.isEmpty(receiver);
        //해쉬 토큰 생성
        let token = null;
        //빈값이 들어오면 리턴
        if (isEmptyEmail) {
            console.log('# 이메일 값이 비었습니다,.');
            return res.json({
                error: true,
                type: 'required'
            })
        }

        //아이디가 있는 지 검사
        await User.findOne({
            email: receiver
        }).lean().exec((err, docs) => {
            if (err) {
                throw err
            }
            //docs가 빈 값이면 프론트에 비었다고 알리고 쿼리 중단
            if (validations.isEmpty(docs)) {
                console.log('# 검색돤 이메일이 없습니다.');
                return res.json({
                    error: true,
                    type: 'noResult'
                });
            }

            //찾은 이메일이 있다면
            if (docs) {
                console.log('# 검색된 이메일이 있습니다.');
                //레디스 디비에 토큰생성 후 이메일 전송
                generateHashToken().then((res) => {
                    console.log(`#생성된 토큰 ${res}`);
                    token = res;
                    //새로 이메일 찾기 요청이 들어와도 덮어씌우게 되니 따로 이전 처리 작업 하지 않아도 된다.
                    client.hmset(`findIdToken:${receiver}`, 'email', receiver, 'token', token);
                    //time to live 설정(30분)
                    client.expire(`findIdToken:${receiver}`, 1800);
                }).then(async () => {

                    await client.hgetall(`findIdToken:${receiver}`, (err, obj) => {
                        console.log('# 레디스 세션이 정상적으로 들어갔습니다.');
                        console.log(obj); // { name: 'zero', age: '24' }
                    });

                    const mailOptions = {
                        from: process.env.AWS_VERIFIED_EMAIL,
                        to: receiver, // list of receivers
                        subject: `안녕하세요 ${receiver}님, 리틀원 비밀번호 찾기 관련 이메일입니다.`, // Subject line
                        html: findPasswordTemplate(token, receiver)
                    };

                    //이메일 전송
                    await transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            throw error;
                        } else {
                            console.log('# 이메일을 전송했습니다.');
                            console.log(info);
                            //eventType, account
                            return res.json({
                                success: true,
                                eventType: {
                                    email: true,
                                    phone: false
                                },
                                account: {
                                    email: null
                                },
                                msg: '이메일 전송에 성공했습니다.'
                            });
                        }
                    });

                }).catch((err) => {
                    throw err
                });


            }

        });

    } catch (e) {
        console.log(e);

        res.json({
            error: true,
            type: 'server'
        })
    }


});

//전화 번호 인증 완료 후 비밀번호 변경 핸들링 라우터
router.post('/phone/password', async (req, res) => {
    console.log('# 전화번호 인증 후 비밀번호 변경 요청 시작.');

    try {
        console.log(req.body);

        const password = req.body.password;
        const email = req.body.email;
        const phone = req.body.phone;

        const isEmptyPassword = validations.isEmpty(password);
        const isEmptyEmail = validations.isEmpty(email);
        const isEmptyPhone = validations.isEmpty(phone);

        const isValidPassword = validations.checkPassword(password);
        const isValidEmail = validations.checkEmail(email);


        if (isValidPassword && isValidEmail && !isEmptyEmail && !isEmptyPhone && !isEmptyPassword) {
            console.log('# 유효성 통과');
            //이메일과 전화번호가 일치하는 계정이 있는 지 찾는다. 그 후 비밀번호를 인코딩 한 후에, 변경 프론트에 결과 전달
            //입력 받은 비밀번호를 암호화
            await crypto.pbkdf2(password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                /*key를 base64로 인코딩*/
                const encryptedPw = password.toString(process.env.SECURITY_DIGEST);

                console.log('생성된 비밀번호 : ' + encryptedPw);
                User.findOneAndUpdate({
                    email: email,
                    phone: phone
                }, {$set: {password: encryptedPw}}, {new: true}).lean().exec((err, docs) => {

                    if (err) {
                        console.log('쿼리 실행 중 에러 발생');
                        throw err;
                    }

                    if (docs) {
                        console.log('#일치하는 계정을 찾았습니다.');
                        console.log(docs);
                        return res.json({
                            success: true,
                            msg: '비밀번호 변경에 성공했습니다.'
                        });
                    }
                    console.log('#찾은 결과가 없습니다.');
                });
            });


        } else if (isEmptyEmail) {
            console.log('# 이메일 값이 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyEmail'
            });
        } else if (isEmptyPassword) {
            console.log('# 비밀번호 값이 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyPassword'
            });
        } else if (isEmptyPhone) {
            console.log('# 핸드폰 값이 비었습니다.');
            return res.json({
                error: true,
                type: 'emptyPhone'
            });
        } else if (!isValidEmail) {
            console.log('# 적합하지 않은 이메일');

            return res.json({
                error: true,
                type: 'emailValidation'
            });
        } else if (!isValidPassword) {
            console.log('# 적합하지 않은 비밀번호');
            return res.json({
                error: true,
                type: 'passwordValidation'
            });
        }


    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        });
    } finally {
        console.log('# 전화번호 인증 후 비밀번호 변경 요청 종료');
    }

});


//이메일 링크타고 넘어와서 토큰일치하는 지 요청하는 함수
router.post('/tokencheck', async (req, res) => {
    console.log('# 토큰 인증 요청이 들어왔습니다.');
    //1.토큰을 찾는다.
    //2.이메일과 토큰이 일치하면 페이지에 머물 수 있께금 한다.
    //3. 비밀번호를 변경한다.
    //4. 비밀번호 변경시 토큰을 삭제한다.
    try {
        const token = req.body.token;
        const email = req.body.email;

        await client.hgetall(`findIdToken:${email}`, (err, obj) => {

            if (obj) {
                console.log('# 레디스 데이터베이스에서 결과를 찾았습니다.');
                console.log(obj);
                if (obj.email === email && obj.token === token) {
                    return res.json({
                        success: true,
                        token: token,
                        email: email,
                        msg: '유효한 토큰입니다.'
                    });
                }
            }

            if (err) {
                throw err
            }

            console.log('#레디스 검색 결과, 유효한 토큰이 없습니다.');
            return res.json({
                success: false
            })

        });//redis 검색
    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        });
    }


});


//이메일 인증 링크를 통한 비밀번호 변경 요청 처리 라우터

router.post('/modifypassword', async (req, res) => {
    console.log('# 이메일 인증링크를 통한 사용자의 비밀번호 찾기(변경) 요청이 있습니다.');
    console.log(req.body);
    //1. 토큰 이메일 비밀번호에 대해서 유효성 검사를 한다. 2. 패스워드 암호화해서 변경후 저장 3. 레디스 데이터베이스에서 토큰을 지운다.


    const isEmptyEmail = validations.isEmpty(req.body.email);
    const isEmptyPassword = validations.isEmpty(req.body.password);
    const isValidEmail = validations.checkEmail(req.body.email);
    const isEmptyToken = validations.isEmpty(req.body.token);
    const isValidPassword = validations.checkPassword(req.body.password);

    try {

        if (isValidEmail && isValidPassword && !isEmptyToken && !isEmptyEmail && !isEmptyPassword) {
            console.log('# 유효성 검사를 모두 통과');

            crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                /*key를 base64로 인코딩*/
                const encryptedPw = password.toString(process.env.SECURITY_DIGEST);

                console.log('생성된 비밀번호 : ' + encryptedPw);

                User.findOneAndUpdate({email: req.body.email}, {$set: {password: encryptedPw}}, {new: true}).exec((err, docs) => {

                    console.log(docs);

                    if (err) {
                        throw err;
                    }

                    if (docs) {
                        //데이터베이스에서 비밀번호를 업그레이드 한 후에 레디스 디비에 있는 토큰 값도 지워준다.
                        client.del(`findIdToken:${req.body.email}`);
                        return res.json({
                            success: true,
                            msg: '비밀번호 변경에 성공하였습니다. 토큰을 삭제합니다.'
                        })
                    }
                });//QUERY end

            });


        } else if (isEmptyEmail) {
            return res.json({
                error: true,
                type: 'emptyEmail'
            });
        } else if (isEmptyPassword) {
            return res.json({
                error: true,
                type: 'emptyPassword'
            });
        } else if (!isValidEmail) {
            return res.json({
                error: true,
                type: 'emailValidation',
            });
        } else if (!isValidPassword) {
            return res.json({
                error: true,
                type: 'passwordValidation'
            });
        } else if (isEmptyToken) {
            return res.json({
                error: true,
                type: 'emptyToken'
            });
        }

    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        });
    }


});


module.exports = router;