const express = require('express');
const app = express();
//socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(process.env.PORT || 3000, () => {
    console.log(`서버 포트 ${process.env.PORT}에서 NODE-EXPRESS 서버 실행`);
});

io.on('connection', function(socket){
    console.log('a user connected');
    console.log(socket.handshake.headers);

    //socket 연결 끊을 때
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.broadcast.emit('hi');

    socket.on('/smarttemp', function(msg){
        console.log('message: ' + msg);
    });
});