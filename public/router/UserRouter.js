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
router.post('/request/signUp', async (req, res) => {

    //이메일의 @뒤에는 잘라서 소문자로 저장시킨다.
    //유효성 통과하지 못했을 경우
    try {
        const email = req.body.email;
        const password = req.body.password;
        const terms = req.body.terms;

        const isEmptyEmail = Validations.isEmpty(email);
        const isEmptyPassword = Validations.isEmpty(password);
        const isEmptyTerms = Validations.isEmpty(terms);

        const isValidEmail = Validations.checkEmail(email);
        const isValidPassword = Validations.checkPassword(password);
        const isValidTerms = terms === 'true';

        if (!isEmptyEmail && !isEmptyPassword && !isEmptyTerms && isValidPassword && isValidEmail && isValidTerms) {

            const beforeAtSign = email.substring(0, email.lastIndexOf('@')); //이메일 앞부분
            const AfterAtSign = email.substring(email.lastIndexOf('@'), email.length).toLowerCase(); //이메일 @포함 뒷부분

            const clientEmail = beforeAtSign + AfterAtSign;

            console.log(`회원 가입 시킬 이메일 : ${clientEmail}`);
            console.log('# 회원 가입을 시작합니다.');

            await User.findOne({email: clientEmail}, (err, docs) => {
                //아이디가 존재하면 리턴시킨다.
                if (docs) {
                    console.log(`### ${clientEmail}는 중복된 아이디가 존재합니다. ###`);
                    /* 데이터베이스에 이미 해당 아이디가 존재할 경우 리턴 값*/
                    return res.json({
                        error: true,
                        type: 'duplicated'
                    });

                } else {
                    //암호화한 후에 저장한다.

                    crypto.pbkdf2(password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, enPassword) => {
                        /*key를 base64로 인코딩*/
                        const encryptedPw = enPassword.toString(process.env.SECURITY_DIGEST);

                        console.log('생성된 비밀번호 : ' + encryptedPw);

                        //유저 스키마 생성
                        const user = new User({
                            email: clientEmail, //@뒤가 소문자화된 이메일
                            password: encryptedPw, //암호화된 비밀번호
                            terms: terms, //사용자의 동의 여부
                        });

                        /*데이터 베이스에 저장*/
                        user.save().then((result) => {
                            console.log('# 유저 회원가입 저장 결과');
                            console.log(result);

                            return res.json({
                                success:true
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
            })//db query end
        } else if (isEmptyEmail) {
            throw 'emptyEmail';
        } else if (isEmptyPassword) {
            throw 'emptyPassword';

        } else if (isEmptyTerms) {
            throw 'emptyTerms';

        } else if (!isValidEmail) {
            throw 'notValidEmail';

        } else if (!isValidPassword) {
            throw 'notValidPassword';

        } else if(!isValidTerms){
            throw 'notValidTerms';
        }
    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: e
        })
    } finally {
        console.log('#회원 가입 요청을 종료합니다.');
    }


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
                    _id: {
                        $ne: req.body.clientIdx
                    }
                }).lean().exec((err, docs) => {

                    console.log('## 결과 : ' + docs);
                    if (docs) {
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