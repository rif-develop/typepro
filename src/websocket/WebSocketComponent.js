import io from 'socket.io-client';

export const webSocket = () => {
    const socket = io('http://192.168.35.21:80');
    socket.on('connect', function() {
        console.log('서버와 연결');
    });
};
