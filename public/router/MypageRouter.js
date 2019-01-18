const express = require('express');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();
const User = require('../scheme/user');
const validations = require('../middleware/Validations');
const crypto = require('crypto');

//사용자 정보 수정페이지 이동 전에, 비밀번호 확인 통신
router.post('/passwordcheck', async (req, res) => {

    if (req.body) {
        console.log('# 마이페이지 - 비밀번호 확인 값이 들어왔습니다.');
        console.log(req.body.email);
        console.log(req.body.password);
        //비밀번호 유효성 확인;
        const isPassword = validations.checkPassword(req.body.password);


        //비밀번호가 유효성에 통과하지 못할 경우
        if (!isPassword) {
            console.log('# 유효성 검사에 실패했습니다.');
            return res.json({
                error: true,
                type: 'validation'
            });
        }

        try {


            const pbkdf2Pw = async (password) => {
                await crypto.pbkdf2(password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                    /*key를 base64로 인코딩*/

                    User.findOne({
                        email: req.body.email,
                        password: password.toString(process.env.SECURITY_DIGEST)
                    }).lean().exec((err, docs) => {
                        if (docs) {
                            console.log(docs);
                            return res.json({
                                success: true
                            })
                        }
                        if (err) {
                            throw '# 서버 에러';
                        }

                        console.log('# 비밀번호가 일치하지 않습니다.');
                        res.json({
                            error: true,
                            type: 'password'
                        });

                    });
                });//end 암호화
            };

            await pbkdf2Pw(req.body.password)

        } catch (e) {
            //서버에러라고 가정
            console.log(e);
            res.json({
                error: true,
                type: 'server'
            });
        }


    }
});


//사용자 정보 수정 라우터
router.post('/updateclient', async (req, res) => {
    console.log('#사용자 정보 수정 요청이 들어왔습니다.');
    console.log(req.body);

    //닉네임이 유효성에 맞고, 비어있지 않은 지 확인.
    const isClientIdx = !validations.isEmpty(req.body.clientIdx);
    const isNickname = validations.checkNickname(req.body.nickname) && !validations.isEmpty(req.body.nickname);
    const isName = validations.checkString(req.body.name) && !validations.isEmpty(req.body.name);
    const isGender = validations.checkString(req.body.gender) && !validations.isEmpty(req.body.gender);
    const isYear = validations.checkNumber(req.body.year) && !validations.isEmpty(req.body.year);
    const isMonth = validations.checkNumber(req.body.month) && !validations.isEmpty(req.body.month);
    const isDate = validations.checkNumber(req.body.date) && !validations.isEmpty(req.body.date);
    console.log(`${req.body.clientIdx}, ${isClientIdx}`);
    console.log(`닉네임 : ${isNickname}`);
    console.log(`이름 : ${isName}`);
    console.log(`성별 : ${isGender}`);
    console.log(`생년 : ${isYear}`);
    console.log(`월 : ${isMonth}`);
    console.log(`일 : ${isDate}`);

    //사용자 정보 저장
    try {
        await User.findByIdAndUpdate({
            _id: req.body.clientIdx
        }, {$set: {'gender': req.body.gender, 'nickname': req.body.nickname, 'name.first': req.body.name, 'birth.year': req.body.year, 'birth.month': req.body.month, 'birth.date': req.body.date}}, {
            new: true,
            multi: true,
            setDefaultsOnInsert: true,
            upsert: true
        }).lean().exec((err, docs) => {
            if (docs) {
                console.log('#회원 정보 수정 완료');

                //업데이트된 세션을 돌려준다.
                User.findOne({
                    _id: req.body.clientIdx
                }).lean().exec((err, docs) => {
                    console.log('# 세션 검색합니다.');
                    console.log(docs);
                    if (err) {
                        throw '# 세션을 불러오는 중에 에러가 발생했습니다.'
                    }
                    if (docs) {
                        console.log('#세션을 클라이언트 단으로 전송합니다.');
                        //세션 갱신
                        req.session.key = docs;
                        return res.json({
                            success: true,
                            session: docs
                        });
                    }
                });




            }
            if (err) {
                throw '# 서버 에러 발생'
            }
        })

    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: 'server'
        })
    }


});


module.exports = router;