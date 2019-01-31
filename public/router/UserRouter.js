const express = require('express');
const User = require('../scheme/user');
const {check, validationResult} = require('express-validator/check');
const crypto = require('crypto');
const Validations = require('../middleware/Validations');

const router = express.Router();

//이메일 중복 여부 검사
router.post('/emailcheck', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            console.log('중복되지 않음');
            return res.json({
                duplicate: false,
                verifiedId: req.body.email,
                msg: '중복되지 않은 이메일입니다.'
            })
        } else {
            console.log(`# ${req.body.email}은 중복된 이메일(아이디)입니다.`);

            return res.json({
                duplicate: true,
                msg: '중복된 이메일입니다.'
            })
        }
    });
});


/*회원가입 요청*/
router.post('/requestsignup', (req, res) => {
    //유효성 통과하지 못했을 경우
    console.log(req.body.terms);
    console.log(req.body.email);
    console.log(req.body.password);
    User.findOne({email: req.body.email}, (err, docs) => {
        //아이디가 존재하면 리턴시킨다.
        if (docs) {
            console.log(`### ${req.body.email}는 중복된 아이디가 존재합니다. ###`);
            /* 데이터베이스에 이미 해당 아이디가 존재할 경우 리턴 값*/
            return res.json({
                error: true,
                type: 'duplicated'
            })
        } else {
            //암호화한 후에 저장한다.

            crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                /*key를 base64로 인코딩*/
                const encryptedPw = password.toString(process.env.SECURITY_DIGEST);

                console.log('생성된 비밀번호 : ' + encryptedPw);

                //유저 스키마 생성
                const user = new User({
                    email: req.body.email,
                    password: encryptedPw,
                    terms: req.body.terms,
                });

                /*데이터 베이스에 저장*/
                user.save().then((result) => {
                    console.log('저장 결과');
                    console.log(result);

                    /*클라이언트로 데이터베이스 성공 값 전달*/
                    return res.json({
                        success: true
                    });

                }).catch((err) => {
                    return res.json({
                        error: true,
                        type: 'server'
                    })
                });//db query

            });

        }

        if (err) {
            return res.json({
                error: true,
                type: 'server'
            });
        }
    });
});


//이메일 중복 여부 검사 라우터
router.post('/nicknamecheck', async (req, res) => {
    console.log('#이메일 중복 여부를 검사합니다.');
    if (req.body.nickname) {
        console.log('#닉네임 체크 값이 들어왔습니다.');
        console.log(`요청 : ${req.body.nickname}`);
        console.log(`요청자 _id: ${req.body.clientIdx}`);

        try {
            //닉네임 유효성 검사
            const isValidated = Validations.checkNickname(req.body.nickname);

            //유효하다면
            if (isValidated) {

                //닉네임 검색
                await User.findOne({
                    nickname: req.body.nickname,
                    _id:{
                        $ne:req.body.clientIdx
                    }
                }).lean().exec((err, docs) => {

                    console.log('## 결과 : '+docs);
                    if(docs){
                        //닉네임이 있다면 중복된 닉네임이라고 클라이언트에 응답
                        if (docs.nickname === req.body.nickname) {
                            console.log('#중복되는 닉네임이 있습니다.');
                            console.log(docs);

                            return res.json({
                                isDuplicated: true,
                                requestedId: req.body.nickname
                            })
                        }

                        if (err) {
                            //err 에러를 캐치에 던짐
                            throw err
                        }
                    }

                    console.log('# 찾은 닉네임이 없습니다.');

                    return res.json({
                        isDuplicated: false,
                        requestedId: req.body.nickname
                    });

                });


            } else {
                //유효성 실패했다고 메시지
                return res.json({
                    error: true,
                    type: 'validation'
                })
            }

        } catch (e) {
            //서버 에러
            return res.json({
                error: true,
                type: 'server'
            })
        }


    }


});

module.exports = router;