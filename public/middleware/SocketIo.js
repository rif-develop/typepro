const setup = (server) => {
    //app express에서 서버 받아와서 io에 할당
    const io = require('socket.io')(server);
    console.log('# 소켓 서버 실행합니다.');

    //대쉬보드 라우터
    io.on('connection', function onConnect(socket) {
        console.log('소켓 연결 되었습니다.');
        //스마트 보틀, 피피는 http통신, 템프는 소켓 실시간 통신

        //엡에서 보내는 스마트템프 실시간 온도 데이터 받기
        socket.on('smarttemp', (data) => {
            console.log('# 스마트 템프 - 데이터 연결');

            //서버에서 앱으로 데이터 보내주기 (앱에서 요청하였으니 앱이랑 물려있음);
            socket.emit('smarttemp', {msg: '스마트 템프 연결 성공'});

            //소켓 룸에 참여한 특정 유저에게 데이터를 보내준다.
            io.sockets.in(data.clientIdx).emit('get smarttemp', data);
        });


        socket.on('join', (data) => {
            console.log(`방을 파자 :${data.clientId}`);
            socket.join(data.clientId); // We are using room of socket io
        });


        // // //공지사항 보내주기
        // app.post('/app/push', async (req, res) => {
        //     console.log(req.body);
        //     console.log('# 앱 푸쉬 알림을 보냅니다.');
        //
        //     try {
        //         res.status(200).send({
        //             success: true,
        //             msg: '메시지를 보냈습니다.'
        //         });
        //
        //         await socket.broadcast.emit('app notification', {
        //             title: req.body.name,
        //             contents: req.body.contents
        //         });
        //
        //
        //     } catch (e) {
        //         console.log(e)
        //     }
        // });


        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        //스마트 보틀을 소켓 통신으로 사용자 대시보드에 내보낸
    });//end connection
};

module.exports = setup;


