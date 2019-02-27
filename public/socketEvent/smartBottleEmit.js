const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = function (clientIdx) {
    return function (data) {
        if (data) {
            console.log('보틀 데이터 넘김');
            io.sockets.in(clientIdx).emit('get smartbottle', data);
        }
    }
};