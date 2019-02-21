const redis = require('redis');
const session = require('express-session');
const client = redis.createClient();
const RedisStore = require('connect-redis')(session);
require('dotenv').config();

let time = new Date();
time.setTime(time.getTime() + (1 * 3600 * 1000)); //1시간

console.log(process.env.NODE_ENV);
const redisOption = {
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        url: process.env.REDIS_URL,
        client: client,
        ttl: 3600,
        logErrors: true
    }),
    resave: false,
    saveUninitialized: true,
    secret: process.env.REDIS_SECRET,
    name: 'session-info',
    cookie: process.env.NODE_ENV === 'development' ? {
        secure: false,
        httpOnly: false,
        path: '/',
        expires: time,
    } : {
        secure: false,
        httpOnly: false,
        path: '/',
        expires: time,
        domain: 'www.cizz3007.com'
    }

};


module.exports = redisOption;


