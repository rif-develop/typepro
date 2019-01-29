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
module.exports = router;