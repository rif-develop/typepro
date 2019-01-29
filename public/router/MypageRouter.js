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


//사용자 비밀번호 업데이트 라우터
router.post('/passwordupdate', async (req, res) => {
    console.log('#사용자 비밀번호 업데이트 요청이 들어왔습니다.');
    console.log(req.body);

    //빈값인지 확인
    const isEmptyPw = validations.isEmpty(req.body.password);
    const isEmptyNewPw = validations.isEmpty(req.body.newPassword);
    const isClientIdx = validations.isEmpty(req.body.clientIdx);

    //유효성 테스트
    const isValidPw = validations.checkPassword(req.body.password);
    const isValidNewPw = validations.checkPassword(req.body.newPassword);

    console.log(`비밀번호가 빔 : ${isEmptyPw}, 새 비밀번호가 빔 : ${isEmptyNewPw}, 클라이언트 아이디가 빔 : ${isClientIdx},  유효한 비밀번호 : ${isValidPw},  유효한 새 비밀번호 : ${isValidNewPw}`)

    //모든 유효성을 통과하면
    if (!isEmptyNewPw && !isEmptyPw && !isClientIdx && isValidPw && isValidNewPw) {
        console.log('# 유효성을 모두 통과했습니다..데이터베이스 처리를 시작합니다.');
        try {

            // #1 기존 사용하던 비밀번호가 일치하는 지 확인
            await crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                //에러 발생시 핸들링
                if (err) {
                    throw err;
                }
                //비밀번호 암호화
                const encryptedPw = password.toString(process.env.SECURITY_DIGEST);

                console.log(encryptedPw);

                //비밀번호가 일치하는 지 확인하는 쿼리
                User.find({_id: req.body.clientIdx, password: encryptedPw}).lean().exec((err, docs) => {

                    //에러 발생시 핸들링
                    if (err) {
                        throw err;
                    }

                    //문서를 찾으면
                    if (docs.length > 0) {
                        console.log(docs.length);
                        console.log('# 일치하는 계정을 찾았습니다.');
                        console.log(docs);

                        //#2 비밀번호 암호화 업데이트
                        crypto.pbkdf2(req.body.newPassword, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {

                            //에러
                            if (err) {
                                throw err;
                            }

                            //암호화 처리된 비밀번호
                            const encryptedPw = password.toString(process.env.SECURITY_DIGEST);

                            console.log('# 생성된 비밀번호' + encryptedPw);

                            console.log('# 데이터베이스에 비밀번호 업데이트..');

                            User.findByIdAndUpdate({
                                    _id: req.body.clientIdx,
                                },
                                {
                                    $set: {
                                        password: encryptedPw,
                                        "status.lastModifiedPw": Date.now()
                                    }
                                },
                                {
                                    new: true,
                                    multi:true
                                }
                            ).lean().exec((err, docs) => {
                                if (docs) {
                                    console.log('#데이터 베이스 처리 결과');
                                    console.log(docs);
                                    //비밀번호 변경 성공시 true반환
                                    req.session.key = docs;
                                    return res.json({
                                        success: true
                                    })
                                }

                                if (err) {

                                    console.log('# 에러 ' + err);

                                    throw err;
                                }

                            })
                        });
                    } else {
                        console.log('#비밀번호가 일치하는 계정이 없습니다.');
                        //문서를 찾지 못했을 경우
                        return res.json({
                            error: true,
                            type: 'password'
                        });
                    }
                });//end query
            });//end crypto

        } catch (e) {

            console.log(e);

            return res.json({
                error: true,
                type: 'server'
            });
        }


    } else if(!isValidPw || isEmptyPw){

        res.json({
            error:true,
            type:'passwordValidation',
        });

    } else if(!isValidNewPw || isEmptyNewPw){

        res.json({
            error:true,
            type:'newPasswordValidation',
        });
    } else{
        res.json({
            error:true,
            type:'required',
        });
    }
});


module.exports = router;