const express = require('express');
const crypto = require('crypto');
const User = require('../scheme/user');
const router = express.Router();


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


    console.log('-------');

    //먼저 아이디가 있는지  확인 -> 계정이 없습니다
    // 있으면 비밀번호를 해쉬화 해서 -> 비밀번호가 틀렸습니다.
    // 쿼리를 실행시킴 -> 계정이 없습니다.


    User.findOne().where('email').equals(req.body.email).exec((err, user) => {

        //이 에러가 뜬다면 서버에러라고 가정한다.
        if (err) {
            console.log('# 에러' + err);
            res.json({
                success: false,
                type: 'server'
            });
        } //end if

        //찾고자 하는 아이디가 있다면
        if (user) {
            //암호화 방식 그대로 다시 암호화해서 비밀번호가 일치하는지 먼저 찾아낸다.
            crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                const encrytedPw = password.toString(process.env.SECURITY_DIGEST);
                User.findOne().where('email').equals(req.body.email).where('password').equals(encrytedPw).exec((err, user) => {
                    if (err) {
                        console.log('# 에러' + err);
                        res.json({
                            success: false,
                            type: 'server'
                        });
                    }
                    //findeOne이면 1개니까 user 그 외에 find면은 user.length> 0 , user[0]._id이런식
                    if (user) {
                        console.log('# 일치하는 계정을 찾았습니다.');

                        //1시간
                        const hour = 3600000;
                        // const min = 60000; //1min

                        //REDIS DB에 세션을 저장시킨다.
                        req.session.key = {
                            _id: user._id,
                            grade:user.grade,
                            point:user.point,
                            email: req.body.email,
                            password: encrytedPw,
                            name: {
                                first: user.name.first,
                                last: user.name.last
                            },
                            birth:user.birth,
                            gender:user.gender,
                            nickname:user.nickname,
                            country:user.country,
                            phone:user.phone,
                            type:user.type,
                            status:{
                                visit:user.status.visit,
                                lastVisit:user.status.lastVisit,
                                lastFindId: user.status.lastFindId,
                                lastFindPw:user.status.lastFindPw,
                                lastModifiedPw:user.status.lastModifiedPw,
                                signupDate:user.status.signupDate,
                                admin:user.status.admin,
                                token:user.status.token,
                                social:user.status.social
                            }


                        };

                        // 클라이언트에 전달;
                        res.json({
                            key: req.session.key,
                            idx: user._id,
                            success: true
                        });

                    } else {
                        console.log('# 일치하는 계정의 비밀번호가 틀렸습니다.');
                        //아이디가 없다고 클라이언트에 전달

                        res.json({
                            success: false,
                            type: 'password',
                        });
                    }
                });
            });
        } else {
            console.log('##로그인을 시도하려는 아이디를 찾을 수가 없습니다.');

            res.json({
                success: false,
                type: 'account',
            });
        }
    });
});//end router


//로그아웃
router.post('/logout', (req, res) => {
    //세션 삭제
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                msg: '세션 삭제 과정에서 에러 발생.'
            });
        } else {
            console.log('# 세션이 성공적으로 삭제되었습니다.');
            res.json({
                success: true,
                msg: '로그아웃이 성공적으로 되었습니다.'
            });
        }
    });
    //쿠키도 삭제
    res.clearCookie('session-info');
});


module.exports = router;
