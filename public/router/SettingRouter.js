const express = require('express');
const Validation = require('../middleware/Validations');
const router = express.Router();
const User = require('../scheme/userSchema');
const checkValidOption = require('../middleware/checkValidOption');
//컨트롤러
const SettingController = require('../querycontroller/SettingController');


//알람 옵션 변경 요청
router.post('/update/alarm', async (req, res) => {
    console.log('# 사용자 환경설정 변경 요청이 들어왔습니다.');
    console.log(req.body);

    try {
        const clientIdx = req.body.clientIdx;
        const reqOption = req.body.option;

        const isEmptyClientIdx = Validation.isEmpty(clientIdx);
        const isEmptyOption = Validation.isEmpty(reqOption);
        const isValidOption = checkValidOption(reqOption); //적합한 옵션인지 확인한다.

        if (!isEmptyClientIdx && !isEmptyOption && isValidOption) {

            //사용자의 환경설정을 업데이트하고 통쨰로 리턴 . 업데이트할 필드를 찾고 걔를 반대값으로
            User.findById(clientIdx, (err, docs) => {
                console.log('#환경 설정을 업데이트할 유저를 찾았습니다.');
                console.log(docs);
                docs.option[reqOption] = !docs.option[reqOption];

                docs.save((err) => {
                    if (err) {
                        throw 'server'
                    }
                });//save

                //세션에 변경된 값 전달
                req.session.key = docs;

                //프론트에 세션 값 전달
               res.json({
                    success: true,
                    session: docs
                });
            });//db query

        } else if (!isValidOption) {
            console.log('# 잘못된 옵션 값이 넘어옴');
            throw 'wrongOption';
        } else {
            console.log('# 필수 변수가 없음');
            throw 'required';

        }//end if~else
    } catch (e) {
        console.log('# 에러 발생');
        console.log(e);

        //필수 값 중에 누락된 값이 있을 경우 에러 전달
        if (e === 'required') {
            return res.json({
                error: true,
                type: 'required'
            });
        } else if (e === 'server') {
            return res.json({
                error: true,
                type: 'server'
            });
        } else if (e === 'wrongOption') {
            return res.json({
                error: true,
                type: 'wrongOption'
            });
        }
    } finally {
        console.log('# 사용자 환경설정 업데이트 처리 종료');
    }
});


//단위 옵션 변경 요청
router.post('/update/unit', async (req, res) => {
    try {
        console.log('# 단위를 변경 요청');
        const clientIdx = req.body.clientIdx;
        const unitVal = req.body.unit;
        console.log(clientIdx, unitVal);

        const checkUnit = await SettingController.checkAvailableUnitOption(unitVal);

        if (checkUnit === true) {

            const updateResult = await SettingController.setUnitOption(clientIdx, unitVal);
            console.log('결과 ', updateResult);

            //세션 갱
            req.session.key = updateResult;

            //세션 정보를 업데이트 해야한다. 옵션값을 세션 스토어를 참조한다.
            res.json({
                success: true,
                session: updateResult
            });

        } else {
            throw 'server'
        }

    } catch (e) {
        console.log('# 에러 : ', e);
        res.json({
            error: true,
            type: e
        });
    } finally {
        console.log('# 단위를 변경 요청 종료');
    }

});


//이메일 구독 옵션 변경 처리 라우터
router.post('/update/emailsubscription', async (req, res) => {
    try {
        const clientIdx = req.body.clientIdx;
        const email = req.body.email;

        const isEmptyClientIdx = Validation.isEmpty(clientIdx);
        const isEmptyEmail = Validation.isEmpty(email);

        const allValid = !isEmptyClientIdx && !isEmptyEmail;

        if(allValid){
            //1. 옵션 토글링
            const emailResult = await SettingController.changeEmailSubscription(clientIdx,email);

            //2. 세션 갱신
            req.session.key = emailResult;

            //3. 클라이언트에 전달
            res.json({
                success:true,
                session:emailResult
            })

        } else if(isEmptyClientIdx){
            throw 'emptyClientIdx';
        } else if(isEmptyEmail){
            throw 'emptyEmail';
        }

        // 구독이 true라면 이메일 구독 관리 스키마에 아이디를 추가한다.
        // 나중에 회원가입 하는 회원이 이미 구독한 회원이라면 옵션을 true로 바꿔준다.
        // 구독이 false람ㄴ 이메일 구돡 관리 스키마에서 아이디를 제거한다.
    } catch (e) {
        console.log('# 에러', e);
        res.json({
            error:true,
            type:e
        })
    } finally {

    }
});


module.exports = router;