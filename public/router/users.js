const express = require('express');
const User = require('../scheme/user');
const {check, validationResult} = require('express-validator/check');
const crypto = require('crypto');
//단방향 암호화 방식은 주로 해시기법을 사용. 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방법
//createHash() 사용할 알고리즘, update() 알고리즘과 해쉬를 적용할 문자열, digest()  인코딩할 알고리즘
console.log('base64 : ', crypto.createHash('sha512').update('password').digest('base64'));
// console.log('hex : ', crypto.createHash('sha512').update('password').digest('hex'));
// console.log('latin1 : ', crypto.createHash('sha512').update('password').digest('latin1'));
//비밀번호는 pbkdf2에 salt 를 쳐서 많이 단방향 암호화를 한다.

const router = express.Router();


/*회원가입 요청*/
router.post('/request/signup', [
    check('email').isEmail().matches(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/).withMessage('must!!!'),
    check('password').isLength({
        min: 8,
        max: 20
    }).matches(/^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]).*$/).withMessage('must!!!'),
    check('terms').isBoolean()
], (req, res, next) => {


    const user = new User({
        email: req.body.email,
        password: crypto.createHash(process.env.HASH).update(req.body.password).digest(process.env.DIGEST),
        terms: req.body.terms,
    });


    /*저장*/
    user.save().then((result) => {
        console.log('저장 결과');
        console.log(result);
    }).catch((err) => {
        console.log(err);
        next(err);
    })

});

module.exports = router;