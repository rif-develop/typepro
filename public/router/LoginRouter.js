const express = require('express');
const crypto = require('crypto');
const User = require('../scheme/userSchema');
const router = express.Router();


/*
* 로그인 라우터
* 세션을 redis서버에 저장한다.
*`
* */
router.post('/login', async (req, res) => {
    console.log(`# ${req.body.email}의 로그인 시도`);
    /*
    * 아이디와 비밀번호가 일치하는 지 확인한다.
    * 1. 아이디가 일칠하는데 비밀번호가 일치하지 않을 경우
    * 2. 아이디가 없을 경우
    * 3. 비밀번호를 암호화해서 데이터베이스에서 아이디, 비밀번호가 전부 일치할 경우
    * 로그인 시킨 후에 리다이렉트 시킨 후에 세션 생성시키기.
    * */


    console.log('-------');
    console.log(req.body.email);
    console.log(req.body.password);
    console.log('-------');

    //먼저 아이디가 있는지  확인 -> 계정이 없습니다
    // 있으면 비밀번호를 해쉬화 해서 -> 비밀번호가 틀렸습니다.
    // 쿼리를 실행시킴 -> 계정이 없습니다.

    try {
        console.log('# 로그인 처리 시작');
        await User.findOne().where('email').equals(req.body.email).exec((err, user) => {

            //이 에러가 뜬다면 서버에러라고 가정한다.
            if (err) {
                console.log('# 에러' + err);
                throw err;
            } //end if

            //찾고자 하는 아이디가 있다면
            if (user) {
                //암호화 방식 그대로 다시 암호화해서 비밀번호가 일치하는지 먼저 찾아낸다.
                crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                    const encrytedPw = password.toString(process.env.SECURITY_DIGEST);

                    //-1 내림 차순(큰숫자에서 작은숫자로)
                    //1 오름 차순(작은 숫자에서 큰숫자로)
                    User.findOne({
                        email:req.body.email,
                        password:encrytedPw
                    }).populate({path: 'babies', options: { sort: { '_id': 1} } }).exec((err, user) => {

                        if (err) {
                            console.log('# 에러' + err);
                            throw err;
                        }

                        if (user) {
                            console.log('# 일치하는 계정을 찾았습니다.');

                            //필요한 다른 스키마들을 파퓰레이트해서 클라이언트에 전달해준다.

                            //1. 배송지 주소를 populate 한다.

                            //2. 아이 정보를 populate 해준다.

                            //REDIS DB에 세션을 저장시킨다.
                            req.session.key = user;

                            // 클라이언트에 유저의 세션 전달;
                            return res.json({
                                success: true,
                                session: req.session.key,
                                sessionId:req.session.id
                            });

                        } else {
                            console.log('# 일치하는 계정의 비밀번호가 틀렸습니다.');
                            //아이디가 없다고 클라이언트에 전달

                            return res.json({
                                error: true,
                                type: 'password',
                            });
                        }
                    });
                });
            } else {
                console.log('##로그인을 시도하려는 아이디를 찾을 수가 없습니다.');

                return res.json({
                    error: true,
                    type: 'account',
                });
            }
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        });

    } finally {
        console.log('#로그인 처리 끝');
    }//try~catch
});//end router


//로그아웃 처리 라우터
router.post('/logout', async (req, res) => {
    //세션 삭제
    try{
        req.session.destroy((err) => {
            if (err) {
                console.log('#로그아웃 과정 중에 에러가 발생했습니다.');
                throw err;

            } else {
                console.log('# 세션이 성공적으로 삭제되었습니다. 로그아웃 되었습니다.');
                res.json({
                    success: true,
                    msg: '로그아웃이 성공적으로 되었습니다.'
                });
            }
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            msg: '세션 삭제 과정에서 에러 발생.'
        });
    } finally {
        //세션삭제시에 쿠키도 삭제
        res.clearCookie('session-info');
    }

});


module.exports = router;
