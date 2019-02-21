import io from 'socket.io-client';

export const socket = io(process.env.AWS_EC2_IP);
