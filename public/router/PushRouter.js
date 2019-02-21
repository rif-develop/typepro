const express = require('express');
const router = express.Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
router.post('/push',async (req,res)=>{
    console.log(req.body);

    io.on('connection', (socket, req) => {
        socket.emit('appnotification', {
            title: '형규시',
            contents: '곧 퇴근시간입니다.'
        });
    });

});



module.exports = router;