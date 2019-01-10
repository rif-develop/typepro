const express = require('express');
const User = require('../scheme/user');
const {check, validationResult} = require('express-validator/check');
const crypto = require('crypto');


const router = express.Router();

//이메일 중복 여부 검사
router.post('/emailcheck', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            console.log('중복되지 않음');
            return res.json({
                duplicate: false,
                msg: '중복되지 않은 이메일입니다.'
            })
        } else {
            console.log('중복됨');

            return res.json({
                duplicate: true,
                msg: '중복된 이메일입니다.'
            })
        }
    });
});


/*회원가입 요청*/
router.post('/request/signup', [
    check('email')
        .isEmail()
        .matches(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/),
    check('password').isLength({
        min: 8,
        max: 20
    }).matches(/^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]).*$/).withMessage('must!!!'),
    check('terms').isBoolean()
], (req, res, next) => {
    //유효성 통과하지 못했을 경우
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }

    User.findOne({email: req.body.email}, (err, docs) => {
        //아이디가 존재하면 리턴시킨다.
        if (docs) {
            console.log(`### ${req.body.email}는 중복된 아이디가 존재합니다. ###`);
            /* 데이터베이스에 이미 해당 아이디가 존재할 경우 리턴 값*/
            return res.json({
                success: false,
                redirectUrl: null,
                duplicate: true
            })
        } else {
            //암호화한 후에 저장한다.
            // 
            // 
            // '/#s/a/l/t#/' ,77655,64,'sha512'
            /*
            * 설명 : salt 와 encoding방법은 "절대" 바뀌면 안된다. 
            * 암호화 방식 : pbkdf2
            * 솔트 : .env파일 안에
            * 솔트 삽입 횟수 : 77655,
            * 삽입될 비밀번호 길이 : 64,
            * 해쉬 : .env파일 안에
            * 
            * */
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
                        success: true,
                        redirectUrl: '/login',
                        duplicate: false
                    });

                }).catch((err) => {
                    console.log(err);
                    next(err);
                })

            });

        }

        if (err) {
            return res.json({
                success: false,
                redirectUrl: null,
                duplicate: false
            });
        }
    });


});

module.exports = router;