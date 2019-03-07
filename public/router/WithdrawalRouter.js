const express = require('express');
const router = express.Router();
const Validations = require('../middleware/Validations');
//컨트롤러
const UserController = require('../querycontroller/UserController');

router.post('/request/withdrawal', async (req, res) => {
    try {
        console.log('# 회원 탈퇴 요청 처리 시작');

        console.log(req.body);
        const email = req.body.email;
        const isEmptyEmail = Validations.isEmpty(email);
        const isValidEmail = Validations.checkEmail(email);

        const clientIdx = req.body.clientIdx;
        const isEmptyClientIdx = Validations.isEmpty(clientIdx);

        const password = req.body.password;
        const isEmptypassword = Validations.isEmpty(password);
        const isValidPassword = Validations.checkPassword(password);

        const allValid = !isEmptypassword && !isEmptyEmail && !isEmptyClientIdx && isValidPassword && isValidEmail;

        if (allValid) {
            console.log('# 유효성 통과');

            //암호화된 비밀번호
            const encryptedPassword = await UserController.generateCryptoPassword(password);
            console.log('암호화된 비밀번호  ', encryptedPassword);

            //1. 먼저 비밀번호가 맞는지 확인한다.(return boolean)
            const checkPassword = await UserController.checkIsClientPassword(email,encryptedPassword);

            if(checkPassword){

                //1.유저 스키마 삭제
                const findClient = await UserController.deleteOneClient_WARNING(clientIdx, email, encryptedPassword);
                //2. 배송지 스키마 삭제

                //3. 아기 삭제

                //4. 디바이스 삭제

                //5 .

                if (findClient !== null && findClient !== undefined) {
                    console.log('#회원 탈퇴를 완료했습니다.');
                    res.json({
                        success: true
                    });
                } else {
                    console.log('#회원 탈퇴 실패');
                    res.json({
                        success:false
                    })
                }
            } else{
                console.log('# 비밀번호가 맞지 않습니다.');

                res.json({
                    error:true,
                    type:'wrongPassword'
                })
            }



        } else if (isEmptypassword) {
            throw 'emptyPassword';
        } else if (isEmptyClientIdx) {
            throw 'emptyClientIdx';
        } else if (isEmptyEmail) {
            throw 'emptyEmail';
        } else if (!isValidPassword) {
            throw 'notValidPassword';
        } else if (!isValidEmail) {
            throw 'notValidEmail';
        }
    } catch (e) {
        console.log('# 에러', e);
        res.json({
            error: true,
            type: e
        });
    } finally {
        console.log('# 회원 탈퇴 요청 처리 끝');
    }
});

module.exports = router;