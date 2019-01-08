const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
mongoose.Promise = global.Promise;
/*라우터*/
const userRouter = require('./public/router/users');


/*환경변수 불러오기*/
const envResult = require('dotenv').config({
    path: __dirname + '/.env'
});

if (envResult.error) {
    console.log('노드 환경 변수 파일을 불러들이지 못하였습니다.');
    throw envResult.error;
}

console.log(`${process.env.WHO_IS_DEVELOPER}님이 어플리케이션 서버를 실행했습니다.`);


////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(__dirname + '/dist/images'));
/*회원가입 라우터*/
app.use('/', userRouter);
//배포용 파일 경로
app.use('/dist', express.static(__dirname + '/dist'));

/*인덱스 페이지 경로*/
app.use('/', express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});


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
            console.log(`몽고 DB 연결 성공`);
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