exports.headerCheck = (req, res) => {
    const isMyApp = req.headers['access-check'] === process.env.APP_SECRET_CHECK;
    console.log(process.env.APP_SECRET_CHECK);
    if (!isMyApp) {
        console.log('# 허용되지 않은 앱에서의 접근');
        return res.json({
            error: true,
            msg: '접근이 허락되지 않은 요청입니다.'
        });
    } else{
        console.log('허용된 접근 - 접근 가능합니다.');
    }//end if
};