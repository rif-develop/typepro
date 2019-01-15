const redis = require('redis');
const session = require('express-session');
const client = redis.createClient();
const RedisStore = require('connect-redis')(session);
require('dotenv').config();

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
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
    name: 'session-info',
    cookie:{
        secure:false,
        httpOnly: true,
        path:'/',
        expires:new Date(Date.now()+3600000)
    }
};


module.exports = redisOption;


