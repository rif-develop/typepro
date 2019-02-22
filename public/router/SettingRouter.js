const express = require('express');
const Validation = require('../middleware/Validations');
const router = express.Router();
const User = require('../scheme/userSchema');
const checkValidOption = require('../middleware/checkValidOption');

router.post('/update', async (req, res) => {
    console.log('# 사용자 환경설정 변경 요청이 들어왔습니다.');
    console.log(req.body);

    try {
        const clientIdx = req.body.clientIdx;
        const reqOption = req.body.option;

        const isEmptyClientIdx = Validation.isEmpty(clientIdx);
        const isEmptyOption = Validation.isEmpty(reqOption);
        const isValidOption = checkValidOption(reqOption); //적합한 옵션인지 확인한다.


        console.log(isEmptyClientIdx, isEmptyOption, isValidOption);


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
                //프론트에 값 전달
                return res.json({
                    success: true,
                    option: docs.option
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

module.exports = router;