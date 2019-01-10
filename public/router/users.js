const express = require('express');
const User = require('../scheme/user');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
//단방향 암호화 방식은 주로 해시기법을 사용. 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방법
//createHash() 사용할 알고리즘, update() 알고리즘과 해쉬를 적용할 문자열, digest()  인코딩할 알고리즘
console.log('base64 : ', crypto.createHash('sha512').update('password').digest('base64'));
// console.log('hex : ', crypto.createHash('sha512').update('password').digest('hex'));
// console.log('latin1 : ', crypto.createHash('sha512').update('password').digest('latin1'));
//비밀번호는 pbkdf2에 salt 를 쳐서 많이 단방향 암호화를 한다.

const router = express.Router();


//이메일 중복 여부 검사
router.post('/emailcheck', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            console.log('중복되지 않음');
            return res.json({
                duplicate:false,
                msg:'중복되지 않은 이메일입니다.'
            })
        } else {
            console.log('중복됨');

            return res.json({
                duplicate:true,
                msg:'중복된 이메일입니다.'
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
        return res.json({ errors: errors.array() });
    }

    User.findOne({email: req.body.email}, (err, docs) => {
        //아이디가 존재하면 리턴시킨다.
        if (docs) {
            console.log(`### ${req.body.email}는 중복된 아이디가 존재합니다. ###`);
            return res.json({
                success: false,
                redirectUrl: null,
                duplicate: true
            })
        } else {
            //암호화한 후에 저장한다.
            bcrypt.genSalt(4, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        terms: req.body.terms,
                    });

                    /*저장*/
                    user.save().then((result) => {
                        console.log('저장 결과');
                        console.log(result);

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