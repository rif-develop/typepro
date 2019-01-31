const express = require('express');
const Setting = require('../scheme/setting');
const router = express.Router();


router.post('/update', async (req, res) => {
    console.log('# 사용자 환경설정 변경 요청이 들어왔습니다.');
    console.log(req.body);

    const clientIdx = req.body.clientIdx;

    //유저 스키마 생성
    const setting = new Setting({
        writer: clientIdx,
        option: {
            memberActivityAlarm: true,
            likeAlarm: true,
            replyAlarm: true,
            invitationAlarm: true,
            birthdayAlarm: true,
            scheduleAlarm: true,
            connectedDeviceAlarm: true,
            unit: 'si', //usa or si , default:si
            emailSubscription: true
        }
    });

    /*데이터 베이스에 저장*/
    setting.save().then((result) => {
        console.log('저장 결과');
        console.log(result);

        /*클라이언트로 데이터베이스 성공 값 전달*/
        return res.json({
            success: true
        });

    }).catch((err) => {
        return res.json({
            error: true,
            type: 'server'
        })
    });//db query
});

module.exports = router;