import io from 'socket.io-client';

console.log(process.env.SERVERIP);
export const socket = io('http://13.209.101.234:80');
