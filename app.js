const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const express = require('express');
const app = express();
const http = require('http').Server(app);

const redis = require('redis');
const client = redis.createClient();
const cors = require('cors');
//socket.io

const socketIoSetup = require('./public/middleware/SocketIo');

const redisOption = require('./public/middleware/Redis');
//몽구스 프라미스 설정
mongoose.Promise = global.Promise;

const userRouter = require('./public/router/UserRouter');
const loginRouter = require('./public/router/LoginRouter');
const addressRouter = require('./public/router/AddressRouter');
const mypageRouter = require('./public/router/MypageRouter');
const nexmoRouter = require('./public/router/NexmoPhoneRouter');
const emailRouter = require('./public/router/EmailRouter');
const imageRouter = require('./public/router/ImageUploadRouter');
const settingRouter = require('./public/router/SettingRouter');
const babyInfoRouter = require('./public/router/BabyInfoRouter');
const pushRouter = require('./public/router/PushRouter');
const dashboardRouter = require('./public/router/DashboardRouter');
//앱 라우터
const appRouter = require('./public/router/EchoTestRouter');

/*환경변수 불러오기*/
const envResult = require('dotenv').config({
    path: __dirname + '/.env'
});

if (envResult.error) {
    console.log('노드 환경 변수 파일을 불러들이지 못하였습니다.');
    throw envResult.error;
}

console.log(`${process.env.WHO_IS_DEVELOPER}님이 어플리케이션 서버를 실행했습니다.`);

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors({credentials: true, origin: true}));

/*미들웨어*/
app.use(cookieParser(process.env.REDIS_SECRET));

//json parser
app.use(express.json());
app.use(express.urlencoded({limit: '4mb', extended: true, parameterLimit: 1000000}));

//session redis 사용
app.use(session(redisOption));

//http로 접속시 자동으로 https로 리다이렉트 시켜주는 미들웨어
// app.use((req, res, next) => {
//     if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https') && process.env.NODE_ENV === 'production') {
//         console.log('# HTTPS 리다이렉션 미들웨어 실행');
//         res.redirect('https://' + req.get('Host') + req.url);
//     } else
//         next();
// });

//헬스 체크 페이지
app.get('/healthCheck', function(req, res)
{
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Health Check Page");
    res.end();
});


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

//사용자 환경설정 라우터
app.use('/setting', settingRouter);

//앱 푸쉬 라우터
// app.use('/app', pushRouter);

//대쉬보드 라우터
app.use('/dashboard', dashboardRouter);
//아이 정보 라우터
app.use('/baby', babyInfoRouter);

//앱 테스트 라우터
app.use('/app', appRouter);

//새로고침시 페이지 뜰 수 있게 하기.
app.get('*', (req, res) => {
    console.log('### 요청에 의한 페이지 렌더링 ###');
    //header 설정
    console.log('요청 값');

    const sessionKey = `sess:${req.session.key}`;

    client.get(sessionKey, (err, data) => {
        console.log('레디스에 있는 세션:', data)
    });
    res.sendFile(path.resolve(__dirname, 'index.html'))
});


//세션 넘겨주기
app.use('/getSession', async (req, res) => {
    //req.session.key 즉, 세션이 있으면
    console.log(req.headers.cookie);
    try {
        if (req.session.key) {
            console.log('#세션이 있습니다.');
            //세션 ttl 갱신
            // req.session.touch();
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


http.listen(process.env.PORT || 3000, () => {
    console.log(`서버 포트 ${process.env.PORT}에서 NODE-EXPRESS 서버 실행`);
});
//소켓 서버
socketIoSetup(http);

