import io from 'socket.io-client';

console.log('변경 점 적용되어짐');
export const socket = io('ws://localhost:80', {transports: ['websocket']});

