const Validations = require("../middleware/Validations");
//schema
const User = require('../scheme/userSchema');
const Baby = require('../scheme/babySchema');
const BottleSchema = require('../scheme/smartbottleSchema');
const PeepeeSchema = require('../scheme/smartpeepeeSchema');
const TempSchema = require('../scheme/smarttempSchema');

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const {headerCheck} = require('../middleware/HeaderCheck');
const redis = require('redis');
const client = redis.createClient();
//컨트롤러
const BabyController = require('../querycontroller/BabyController');
const UserController = require('../querycontroller/UserController');

//app에서 회원가입요청을 처리하는 라우터
router.post('/signup', async (req, res) => {
    try {
        console.log(req.headers);
        //#허용되지 않은 어플리케이션의 요청이라면 리턴 시킨다.
        const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

        if (!isMyApp) {
            console.log('# 허용되지 않은 앱에서의 접근');
            return res.json({
                error: true,
                msg: '접근이 허락되지 않은 요청입니다.'
            });
        }

        console.log('# 앱 회원가입을 시작합니다.');
        let email = req.body.email;
        const terms = req.body.terms;
        const password = req.body.password;

        console.log(email);
        console.log(password);
        console.log(terms);

        const isEmptyEmail = Validations.isEmpty(email);
        const isEmptyPassword = Validations.isEmpty(password);
        const isEmptyTerms = Validations.isEmpty(terms);

        const isValidEmail = Validations.checkEmail(email);
        const isValidPassword = Validations.checkPassword(password);


        //모든 값들이 적합할 경우 진행
        if (!isEmptyPassword && !isEmptyEmail && !isEmptyTerms && isValidEmail && isValidPassword) {
            const beforeAtSign = email.substring(0, email.lastIndexOf('@')); //이메일 앞부분
            const AfterAtSign = email.substring(email.lastIndexOf('@'), email.length).toLowerCase(); //이메일 @포함 뒷부분

            const clientEmail = beforeAtSign + AfterAtSign;

            console.log(`회원 가입 시킬 이메일 : ${clientEmail}`);
            console.log('# 회원 가입을 시작합니다.');


            await User.findOne({email: clientEmail}, (err, docs) => {
                if (err) {
                    return res.json({
                        response: 'server',
                        msg: '서버 에러'
                    })
                }

                if (docs) {
                    console.log('# 중복된 아이디가 있습니다.');
                    return res.json({
                        response: 'duplicated',
                        msg: '중복된 이메일입니다.'
                    })
                }

                //중복된 아이디가 없다면 다음 쿼리 실행
                crypto.pbkdf2(req.body.password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                    const encrytedPw = password.toString(process.env.SECURITY_DIGEST);

                    const user = new User({
                        email: clientEmail,
                        password: encrytedPw,
                        terms: terms
                    });

                    user.save().then((result) => {
                        console.log(result);
                        res.json({
                            response: 'success',
                            result: result
                        });
                    }).catch((err) => {

                        if (err) {
                            console.log(err);
                            throw 'server'
                        }
                    });

                    console.log('# 회원 가입 완료.');
                });//crypto 비밀번호 암호화

            });//중복된 아이디가 있을 지 확인하는 쿼리


        } else if (isEmptyEmail) {
            throw "emptyEmail";
        } else if (isEmptyPassword) {
            throw 'emptyPassword';
        } else if (isEmptyTerms) {
            throw 'emptyTerms';
        } else if (!isValidEmail) {
            throw 'notValidEmail';
        } else if (!isValidPassword) {
            throw 'notValidPassword'
        }
    } catch (e) {
        console.log(`에러 : ${e}`);
        return res.json({
            response: e,
            msg: '에러'
        });
    } finally {
        console.log('# 앱 회원가입 절차 종료');
    }
});


//앱에서 로그인을 처리하는 라우터
router.post('/login', async (req, res) => {
    try {
        console.log('# 앱에서 로그인 요청이 왔습니다.');
        console.log(req.headers);
        //#허용되지 않은 어플리케이션의 요청이라면 리턴 시킨다.
        const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

        if (!isMyApp) {
            console.log('# 허용되지 않은 앱에서의 접근');
            return res.json({
                error: true,
                msg: '접근이 허락되지 않은 요청입니다.'
            });
        }

        const email = req.body.email;
        const password = req.body.password;

        const isEmptyEmail = Validations.isEmpty(email);
        const isEmptyPassword = Validations.isEmpty(password);

        const isValidEmail = Validations.checkEmail(email);
        const isValidPassword = Validations.checkPassword(password);


        if (!isEmptyEmail && !isEmptyPassword && isValidEmail && isValidPassword) {

            //분리
            const beforeAtSign = email.substring(0, email.lastIndexOf('@')); //이메일 앞부분
            const afterAtSign = email.substring(email.lastIndexOf('@'), email.length).toLowerCase(); //이메일 @포함 뒷부분

            const clientEmail = beforeAtSign + afterAtSign;

            User.findOne({email: clientEmail}).exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('# 앱 로그인 시도 아이디를 찾았습니다.');
                    console.log(docs.email);


                    crypto.pbkdf2(password, process.env.SECURITY_SALT, 77655, 64, process.env.SECURITY_HASH, (err, password) => {
                        console.log('#비밀번호가 일치하는 지 확인합니다..');
                        const encrytedPw = password.toString(process.env.SECURITY_DIGEST);

                        //아이디와 비밀번호가 일치하는지 확인한다,.

                        User.findOne({email: clientEmail, password: encrytedPw}).exec((err, docs) => {
                            if (err) {
                                throw 'server'
                            }

                            if (docs) {
                                console.log('#아이디와 비밀번호 모두 일치합니다.');
                                console.log(docs);

                                //세션 저장
                                req.session.key = docs;

                                const sessionId = req.session.id;

                                const id = docs._id;
                                return res.json({
                                    response: 'success',
                                    sessionId: sessionId,
                                    id: id
                                });
                            }

                            return res.json({
                                response: 'notPassword',
                                msg: '비밀번호가 안 맞습니다.'
                            })
                        });


                    });


                } else {
                    console.log('# 앱 로그인 시도 아이디를 찾을 수가 없습니다.');
                    return res.json({
                        response: 'notFoundEmail',
                        msg: '가입된 아이디가 아닙니다.'
                    });
                }
            });


        } else if (isEmptyEmail) {
            throw 'emptyEmail'
        } else if (isEmptyPassword) {
            throw 'emptyPassword';
        } else if (!isValidEmail) {
            throw 'notValidEmail'
        } else if (!isValidPassword) {
            throw 'notValidPassword'
        }

    } catch (e) {
        console.log(`로그인 시도 에러 : ${e}`);
        return res.json({
            response: e,
            msg: '로그인 시도 에러'
        });
    } finally {
        console.log('# 앱 로그인 요청 종료');
    }
});//router


//앱 로그아웃처리 라우터
router.post('/logout', async (req, res) => {
    try {
        console.log(req.headers);
        //#허용되지 않은 어플리케이션의 요청이라면 리턴 시킨다.
        const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

        if (!isMyApp) {
            console.log('# 허용되지 않은 앱에서의 접근');
            return res.json({
                error: true,
                msg: '접근이 허락되지 않은 요청입니다.'
            });
        }//end if

        const sessionId = req.body.sessionId;
        const isEmptySessionId = Validations.isEmpty(sessionId);
        console.log(sessionId);

        if (!isEmptySessionId) {
            client.del(`sess:${sessionId}`, (err, reply) => {
                if (err) {
                    throw 'server'
                }
                //0이면 false 1면 true
                if (reply !== null && reply !== undefined && reply !== 0) {
                    req.session.destroy();
                    console.log('# 세션 삭제 완료');
                    console.log(reply);
                    return res.json({
                        response: 'success',
                        msg: '정상적으로 로그아웃 처리 되었습니다.'
                    })
                } else {
                    console.log('#세션 삭제 실패')
                    return res.json({
                        response: 'fail',
                        msg: '삭제할 세션이 없습니다.'
                    })
                }
            });
        } else if (isEmptySessionId) {
            console.log('#요청 세션 값이 비었습니다.');
            throw 'required'
        }

    } catch (e) {
        return res.json({
            response: e,
        });
    }
});


//앱에서 회원탈퇴를 처리하는 라우터
router.post('/withdrawal', async (req, res) => {


});//router


//앱에서 세션을 요청 처리하는 라우터
//앱에서 세션이 있는 지 확인하는 요청은 TRUE false로만 반환.
router.post('/get/session', async (req, res) => {
    console.log('# 앱 세션 요청이 있습니다.');
    const sessionId = req.body.sessionId;
    console.log(sessionId);
    const result = client.get(`sess:${sessionId}`, (err, reply) => {

        if (reply === null) {
            return res.json({
                response: false,
                msg: '서버에 해당 세션이 더 이상 존재하지 않습니다.'
            })
        } else {
            return res.json({
                response: true,
                msg: `현재 세션 아이디는 sess:${sessionId}입니다.`
            })
        }

    });
});

//앱에서 현재 세션이 존재하는 유저의 개인정보 요청을 처리하는 핸들러
router.post('/get/userinfo', async (req, res) => {
    console.log('# 유정 개인 정보 세션 요청이 있습니다.');
    try {
        const sessionId = req.body.sessionId;
        console.log(sessionId);

        const result = await client.get(`sess:${sessionId}`, (err, reply) => {
            if (err) {
                throw 'server'
            }
            if (reply === null) {
                return res.json({
                    response: false,
                    msg: '서버에 해당 세션이 더 이상 존재하지 않습니다.'
                })
            } else {

                //레디스에 스트링되서 들어가 있으니 꺼낼떄 다시 파싱한다.
                reply = JSON.parse(reply);

                //앱에서 필요한 개인정보만 보내기
                let user = {
                    gender: reply.key.gender,
                    nickname: reply.key.nickname,
                    country: reply.key.country,
                    phone: reply.key.phone,
                    type: reply.key.type,
                    grade: reply.key.grade,
                    point: reply.key.point,
                    thumbnail: reply.key.thumbnail,
                    email: reply.key.email,
                    _id: reply.key._id
                };

                console.log(user);
                //서버로 객체화 해서 보내기
                return res.json({
                    response: user,
                    msg: `sess:${sessionId}의 개인정보를 반환합니다.`
                })
            }

        });

    } catch (e) {
        console.log(e)
    } finally {

    }
});

//앱에서 현재 세션이 존재하는 유저의 아기 정보 요청을 처리하는 핸들러
router.post('/get/babyinfo', async (req, res) => {
    console.log('#앱에서 아이 정보 요청이 있습니다.');
    try {

        const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

        if (!isMyApp) {
            console.log('# 허용되지 않은 앱에서의 접근');
            return res.json({
                error: true,
                msg: '접근이 허락되지 않은 요청입니다.'
            });
        }//end if

        const clientIdx = req.body.clientIdx;

        const isEmptyClientIdx = Validations.isEmpty(clientIdx);

        if(isEmptyClientIdx){
            console.log('# 로그인 필요');
            res.json({
                response: 'fail',
                msg: '로그인 해주세요. noClientIdx'
            });
        } else{
            //아이가 없는 유저와 있는 유 저를 구별해서 처리
            await User.findById({_id: clientIdx}).populate('babies').exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs !== null && docs !== undefined && docs.babies.length > 0) {
                    console.log(docs.babies.length);

                    console.log('# 앱 아이 정보 요청 처리 결과');
                    console.log(docs);
                    res.json({
                        response: 'success',
                        _id: docs._id,
                        babies: docs.babies
                    });
                } else {
                    res.json({
                        response: 'fail',
                        msg: '아이가 없습니다.'
                    });
                }
            });
        }

    } catch (e) {
        console.log('# 아이 정보 요청 서버 에러');
        res.json({
            response: e
        });
    } finally {
        console.log('#앱 아이 정보 처리 요청 종료');
    }
});


//아이정보 수정하는 라우터

router.post('/update/babyinfo', async (req, res) => {
    try {
        console.log('# 아이 정보를 앱에서 수정 요청.')
        headerCheck(req, res);

        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;

        const name = req.body.name;
        const gender = req.body.gender;
        const src = req.body.src;
        const year = req.body.year;
        const month = req.body.month;
        const date = req.body.date;
        const weight = req.body.weight;
        const height = req.body.height;
        const bloodType = req.body.bloodType.toUpperCase();

        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyBabyIdx = Validations.isEmpty(babyIdx);
        const isEmptyName = Validations.isEmpty(name);
        const isEmptyGender = Validations.isEmpty(gender);
        const isEmptyYear = Validations.isEmpty(year);
        const isEmptyMonth = Validations.isEmpty(month);
        const isEmptyDate = Validations.isEmpty(date);
        const isEmptyWeight = Validations.isEmpty(weight);
        const isEmptyHeight = Validations.isEmpty(height);
        const isEmptyBloodType = Validations.isEmpty(bloodType);

        const isValidYear = year.length === 4;
        const isValidMonth = month.length === 2;
        const isValidDate = date.length === 2;

        const allValid = !isEmptyClientIdx && !isEmptyBabyIdx && !isEmptyName && !isEmptyGender && !isEmptyYear && !isEmptyMonth && !isEmptyDate && !isEmptyWeight && !isEmptyHeight && !isEmptyBloodType && isValidYear && isValidMonth && isValidDate;

        if (allValid) {
            console.log('# 모든 요청 값들이 유효성을 통과했습니다.');

            console.log('# 아이 정보를 수정합니다.');

            Baby.findOneAndUpdate({
                parent: clientIdx,
                _id: babyIdx
            }, {
                $set: {
                    name: name,
                    gender: gender,
                    weight: weight,
                    height: height,
                    bloodType: bloodType,
                    year: year,
                    month: month,
                    date: date,
                    src: src
                }
            }, {
                new: true,
                multi: true,
                $setOnInsert: true
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('#성공적으로 아이의 정보를 수정했습니다.');
                    return res.json({
                        response: 'success',
                        data: docs
                    });
                }
            })


        } else if (isEmptyClientIdx) {
            const err = {
                response: 'emptyClientIdx',
                msg: 'clientIdx값이 없습니다'
            };

            throw err

        } else if (isEmptyBabyIdx) {
            const err = {
                response: 'emptyBabyIdx',
                msg: 'babyIdx값이 없습니다'
            };

            throw err
        } else if (isEmptyName) {
            const err = {
                response: 'emptyName',
                msg: '아이의 이름을 입력해주세요.'
            };

            throw err
        } else if (isEmptyGender) {
            const err = {
                response: 'emptyGender',
                msg: '아이의 성별을 입력해주세요.'
            };

            throw err
        } else if (isEmptyYear) {
            const err = {
                response: 'emptyYear',
                msg: '년도를 입력해 주세요.'
            };

            throw err
        } else if (isEmptyMonth) {
            const err = {
                response: 'emptyMonth',
                msg: '월을 입력해 주세요.'
            };
            throw err

        } else if (isEmptyDate) {
            const err = {
                response: 'emptyDate',
                msg: '일을 입력해주세요.'
            };
            throw err

        } else if (isEmptyBloodType) {
            const err = {
                response: 'emptyBloodType',
                msg: '혈액형을 입력해주세요.'
            };
            throw err
        } else if (isEmptyHeight) {
            const err = {
                response: 'emptyHeight',
                msg: '아이의 키를 입력해주세요'
            };
            throw err
        } else if (isEmptyWeight) {
            const err = {
                response: 'emptyWeight',
                msg: '아이의 몸무게를 입력해주세요.'
            };
            throw err
        } else if (!isValidYear) {
            const err = {
                response: 'notValidYear',
                msg: '아이의 생년은 4자리 수여야 합니다.'
            };
            throw err
        } else if (!isValidMonth) {
            const err = {
                response: 'notValidMonth',
                msg: '2자리 수여야 합니다.'
            };
            throw err
        } else if (!isValidDate) {
            const err = {
                response: 'notValidDate',
                msg: '2자리 수여야 합니다.'
            };
            throw err
        } else {
            const err = {
                response: 'server',
                msg: '서버 에러 입니다.'
            };
            throw err
        }


    } catch (e) {

        console.log('#에러 발생');
        console.log(e);
        return res.json(e);

    } finally {
        console.log('#앱 아이 수정 요청 종료');
    }
});


//앱에서 아이 등록 요청 처리하는 라우터
router.post('/register/babyinfo', async (req, res) => {
    try {
        console.log('# 앱에서 아이 등록 요청이 있습니다.');

        headerCheck(req, res);
        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const name = req.body.name;
        const gender = req.body.gender;
        const src = req.body.src;
        const year = req.body.year;
        const month = req.body.month;
        const date = req.body.date;
        const weight = req.body.weight;
        const height = req.body.height;
        const bloodType = req.body.bloodType.toUpperCase();

        const isEmptySrc = Validations.isEmpty(src);
        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyName = Validations.isEmpty(name);
        const isEmptyGender = Validations.isEmpty(gender);
        const isEmptyYear = Validations.isEmpty(year);
        const isEmptyMonth = Validations.isEmpty(month);
        const isEmptyDate = Validations.isEmpty(date);
        const isEmptyWeight = Validations.isEmpty(weight);
        const isEmptyHeight = Validations.isEmpty(height);
        const isEmptyBloodType = Validations.isEmpty(bloodType);

        const isValidYear = year.length === 4;
        const isValidMonth = month.length === 2;
        const isValidDate = date.length === 2;

        const allValid = !isEmptyClientIdx && !isEmptyName && !isEmptyGender && !isEmptyYear && !isEmptyMonth && !isEmptyDate && !isEmptyWeight && !isEmptyHeight && !isEmptyBloodType && isValidYear && isValidMonth && isValidDate;

        if (allValid) {
            console.log('# 모든 요청 값들이 유효성을 통과했습니다.');

            console.log('#모든 값이 정상입니다.');

            //0. 기존 아이가 존재하는 지 검색하여 존재한다면 defaultBaby:false, 아이가 없던 유저라면 defaultBaby:true
            const hasBaby = await BabyController.countUserBabies(clientIdx);

            //아이 스키마 생성
            const baby = new Baby({
                parent: clientIdx,
                name: name,
                defaultBaby: hasBaby === 0, //기본 선택 아기, 나중에 아이를 삭제 했을 떄 남은 아이가 한 명이라면 그 아이는 true로
                gender: gender,
                year: year,
                month: month,
                date: date,
                bloodType: bloodType,
                weight: weight,
                height: height,
                createdAt: Date.now(),
                src: isEmptySrc ? null : src, //비어있으면 null을 넣고 아니면 src
            });

            //1. 아이를 저장합니다.
            const babySaveResult = await BabyController.createBaby(baby);
            //아이의 _id
            const babyIdx = babySaveResult._id;
            //부모의 _id
            const parentIdx = babySaveResult.parent;

            //2. 아이의 부모 유저의 babies 필드를 업데이트 한다.(oid);
            const newUserInfo = await UserController.updateBabyId(parentIdx, babyIdx);

            //세션 갱신
            req.session.key = newUserInfo;

            //세션에서 모든 데이터를 관리하므로, 세션을 갱신해 준다. nosql은 정규화보단 집합적으로 관리한다는 것을 잊지 말것.
            //서버로 데이터 보내기
            res.json({
                response: 'success',
                babies: newUserInfo.babies,
            });


        } else if (isEmptyClientIdx) {
            const err = {
                response: 'emptyClientIdx',
                msg: 'clientIdx값이 없습니다'
            };

            throw err

        } else if (isEmptyName) {
            const err = {
                response: 'emptyName',
                msg: '아이의 이름을 입력해주세요.'
            };

            throw err
        } else if (isEmptyGender) {
            const err = {
                response: 'emptyGender',
                msg: '아이의 성별을 입력해주세요.'
            };

            throw err
        } else if (isEmptyYear) {
            const err = {
                response: 'emptyYear',
                msg: '년도를 입력해 주세요.'
            };

            throw err
        } else if (isEmptyMonth) {
            const err = {
                response: 'emptyMonth',
                msg: '월을 입력해 주세요.'
            };
            throw err

        } else if (isEmptyDate) {
            const err = {
                response: 'emptyDate',
                msg: '일을 입력해주세요.'
            };
            throw err

        } else if (isEmptyBloodType) {
            const err = {
                response: 'emptyBloodType',
                msg: '혈액형을 입력해주세요.'
            };
            throw err
        } else if (isEmptyHeight) {
            const err = {
                response: 'emptyHeight',
                msg: '아이의 키를 입력해주세요'
            };
            throw err
        } else if (isEmptyWeight) {
            const err = {
                response: 'emptyWeight',
                msg: '아이의 몸무게를 입력해주세요.'
            };
            throw err
        } else if (!isValidYear) {
            const err = {
                response: 'notValidYear',
                msg: '아이의 생년은 4자리 수여야 합니다.'
            };
            throw err
        } else if (!isValidMonth) {
            const err = {
                response: 'notValidMonth',
                msg: '2자리 수여야 합니다.'
            };
            throw err
        } else if (!isValidDate) {
            const err = {
                response: 'notValidDate',
                msg: '2자리 수여야 합니다.'
            };
            throw err
        } else {
            const err = {
                response: 'server',
                msg: '서버 에러 입니다.'
            };
            throw err
        }
    } catch (e) {
        console.log('#에러 발생');
        console.log(e);
        return res.json(e);
    } finally {
        console.log('#앱 아이 등록 요청 종료');
    }

});


//앱에서 비밀번호 변경요청을 처리하는 라우터
router.post('/password/change', async (req, res) => {

});//router


//앱에서 디바이스 등록 요청을 처리하는 라우터
router.post('/register', async (req, res) => {
    try {
        headerCheck();
        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const serialNo = req.body.serialNo;
        const firmware = req.body.firmware;

        //피피: 배변한 시간,습도,온도
        //기저귀 교체 : 교체한 시간,습도,온도
        //보틀: 시간,온도,각도
        //템프: 시간,온도
        const device = req.body.device;

        if (device === 'smartbottle') {
            const bottle = new BottleSchema({
                owner: clientIdx,
                serialNo: serialNo,
            });

            bottle.save((err, result) => {
                if (err) {
                    throw 'server'
                }

                if (result) {
                    console.log('스마트 보틀을 등록했습니다.');
                    console.log(result);

                    res.json({
                        response: 'success',
                        msg: '스마트 보틀을 등록했습니다.'
                    });
                }
            })
        } else if (device === 'smartpeepee') {
            const peepee = new PeepeeSchema({});
        } else if (device === 'smarttemp') {
            const temp = new TempSchema({});
        }


    } catch (e) {

    } finally {

    }

});

module.exports = router;