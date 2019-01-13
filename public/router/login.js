const express = require('express');
const crypto = require('crypto');
const User = require('../scheme/user');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

/*
* 로그인 라우터
* 세션을 redis서버에 저장한다.
*`
* */
router.post('/login', (req, res, next) => {
    console.log(`# ${req.body.email}의 로그인 시도`);
    /*
    * 아이디와 비밀번호가 일치하는 지 확인한다.
    * 1. 아이디가 일칠하는데 비밀번호가 일치하지 않을 경우
    * 2. 아이디가 없을 경우
    * 3. 비밀번호를 암호화해서 데이터베이스에서 아이디, 비밀번호가 전부 일치할 경우
    * 로그인 시킨 후에 리다이렉트 시킨 후에 세션 생성시키기.
    * */


    //암호화 방식 그대로 다시 암호화해서 비밀번호가 일치하는지 먼저 찾아낸다.
    crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
        const encrytedPw = password.toString(process.env.SECURITY_DIGEST);
        console.log(`# 찾을 비밀 번호 : ${encrytedPw}`);

        User.find().where('email').equals(req.body.email).where('password').equals(encrytedPw).exec((err, user) => {
            if (err) {
                console.log('# 에러' + err);
                return res.json('fail');
            }

            if (user.length > 0) {
                console.log('# 일치하는 계정을 찾았습니다.');
                //1시간
                const hour = 3600000;

                //아이디와 비번
                client.hmset('Client', [
                    'id', req.body.email,
                    'password', encrytedPw,
                    'generated', new Date(Date.now()),
                    'expiry', new Date(Date.now() + hour)
                ]);
                //REDIS DB에 세션을 저장시킨다.

                req.session.key = req.body.email;
                // req.session.cookie.expires = new Date(Date.now() + hour)
                // req.session.cookie.maxAge = hour


            } else {
                console.log('# 일치하는 계정을 찾지 못했습니다.');
                //아이디가 없다고 클라이언트에 전달
                res.json({
                    success: false
                })
            }
        });
    });

    // findEmail(req).exec((err, user) => {
    //     if (err) {
    //         console.log('error');
    //         return res.json({
    //             result: 'fail'
    //         });
    //     }
    //     //이메일 값 얻음
    //     user.forEach((ele) => {
    //          return res.json(ele.email);
    //     });
    // });
    //아이디가 없을 경우


    //아이디는 일치하지만 비밀번호가 일치하지 않을 경우


});


//로그아웃
router.post('/logout', (req, res) => {

});


module.exports = router;
