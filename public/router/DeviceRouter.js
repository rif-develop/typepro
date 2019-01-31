const express = require('express');

const router = express.Router();


router.post('/smartpeepee',async (req,res)=>{

    try{
        //#허용되지 않은 어플리케이션의 요청이라면 리턴 시킨다.
        const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;

        if (!isMyApp) {
            console.log('# 허용되지 않은 앱에서의 접근');
            return res.json({
                error:true,
                msg:'접근이 허락되지 않은 요청입니다.'
            });
        }//end if

        console.log(req.body);
        return res.json({
            success:true,
            msg:'형규님이 주신..'
        })
    } catch (e) {

    }//try catch
});


module.exports = router;