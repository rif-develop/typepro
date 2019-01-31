const express = require('express');
const router = express.Router();


router.post('/test', async (req, res) => {
    console.log('#모바일 요청이 들어왔습니다.');
    console.log(req);
    console.log(res);
    return res.json({
        success: true,
        msg: 'hi! 형규씨 브롤 스타즈 프로'
    });
});

router.post('/signup', async (req, res) => {

    console.log(req.headers);
    //#허용되지 않은 어플리케이션의 요청이라면 리턴 시킨다.
    const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

    if (!isMyApp) {
        console.log('# 허용되지 않은 앱에서의 접근');
        return res.json({
            error:true,
            msg:'접근이 허락되지 않은 요청입니다.'
        });
    }

    console.log(`이메일 ${req.body.email}`);
    console.log(`비밀번호 ${req.body.password}`);

    return res.json({
        success: true,
        msg: `서버에서 앱으로 ${req.body.email}, ${req.body.password}`
    });
});
module.exports = router;