const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const app = express();
const redis = require('redis');
const client = redis.createClient();

const redisOption = require('./public/middleware/Redis');
//몽구스 프라미스 설정
mongoose.Promise = global.Promise;

const userRouter = require('./public/router/UserRouter');
const loginRouter = require('./public/router/login');
const addressRouter = require('./public/router/AddressRouter');
const mypageRouter = require('./public/router/MypageRouter');
const nexmoRouter = require('./public/router/NexmoPhoneRouter');
const emailRouter = require('./public/router/EmailRouter');
const imageRouter = require('./public/router/ImageUploadRouter');
//앱 라우터
const appRouter =require('./public/router/EchoTestRouter');

/*환경변수 불러오기*/
const envResult = require('dotenv').config({
    path: __dirname + '/.env'
});

if (envResult.error) {
    console.log('노드 환경 변수 파일을 불러들이지 못하였습니다.');
    throw envResult.error;
}

console.log(`${process.env.WHO_IS_DEVELOPER}님이 어플리케이션 서버를 실행했습니다.`);


/*미들웨어*/
app.use(cookieParser());
//json parser
app.use(express.json());
app.use(express.urlencoded({limit:'4mb',extended: true, parameterLimit: 1000000}));

//session redis 사용
app.use(session(redisOption));

//배포용 파일 경로
app.use('/dist', express.static(__dirname + '/dist'));
/*인덱스 페이지 경로*/
app.use('/', express.static(__dirname));


//라우터
app.use('/images', express.static(__dirname + '/dist/images'));
/*회원가입 라우터*/
app.use('/signup', userRouter);
// 로그인 라우터
app.use(loginRouter);
//배송지 관리 라우터
app.use('/address', addressRouter);
//마이페이지 라우터
app.use('/mypage', mypageRouter);

//넥스모 핸드폰 인증 라우터
app.use('/nexmo', nexmoRouter);

//이메일 템플릿 라우터
app.use('/find', emailRouter);

//이미지 업로드 라우터
app.use('/upload', imageRouter);

//앱 테스트 라우터
app.use('/app', appRouter);
//새로고침시 페이지 뜰 수 있게 하기.
app.get('*', (req, res) => {
    console.log('### 요청에 의한 페이지 렌더링 ###');

    const sessionKey = `sess:${req.session.key}`;

    client.get(sessionKey, (err, data) => {
        console.log('레디스에 있는 세션:', data)
    });
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

//세션 넘겨주기
app.use('/getSession', async (req, res) => {
    //req.session.key 즉, 세션이 있으면
    try {
        if (req.session.key) {
            console.log('#세션이 있습니다.');
            return res.json({
                isSession: true,
                session: req.session.key
            });
        } else {
            console.log('#세션이 없습니다.');

            return res.json({
                isSession: false,
                session: req.session.key
            });
        }
    } catch (e) {
        console.log('#세션을 가져오는 중에 에러 발생.');
        return res.json({
            isSession: false,
            session: req.session.key
        });
    }

});


client.keys("sess:*", (err, keys) => {
    console.log('#' + keys.length + '2개의 세션이 구동 중입니다.');
});


//store는 세션을 어디에 저장할지 고르는
client.on('subscribe', (channel, message) => {
    console.log('구독', channel, message)
});

client.on('message', (channel, message) => {
    console.log('메시지' + channel, message);
});

client.publish('good dayt', 'doooo')

client.on('error', (err) => {
    console.log(`# ${err} 로 인해 REDIS 데이터 베이스 접속 실패`);
});
client.on('connect', (err) => {
    console.log('# REDIS 데이터 베이스 접속 성공');
});
/////////////////////////////////////////////////////////////////////////////////
//MONGO DB 연결

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }//end if
    mongoose.connect(process.env.DB_URL, {
        dbName: 'littleone',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log(`몽고 DB 연결 에러 ${error}`);
        } else {
            console.log(`# 몽고 DB 연결 성공`);
        }
    });//mongodb connect
};//connect

connect();

mongoose.connection.on('error', (error) => {
    console.log(`몽고 DB 연결 에러 : ${error}`);
});

mongoose.connection.on('disconnected', () => {
    console.error('### 몽고 DB 연결이 끊어졌습니다. 연결을 재시도합니다.###');
    connect();
});


/*서버 실행*/
app.listen(process.env.PORT || 3000, () => {
    console.log(`서버 포트 ${process.env.PORT}에서 NODE-EXPRESS 서버 실행`);
});