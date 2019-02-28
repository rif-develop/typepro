import io from 'socket.io-client';

export const webSocket = () => {
    const socket = io('ws://localhost:80', {transports: ['websocket']});

    socket.on('connect', ()=>{

    });
};
