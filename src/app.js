const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


module.exports = (api) => {
    console.log(api);
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }//end if
        mongoose.connect('mongodb://cizz3007:910508@localhost:27017/admin', {
            dbName: 'littleone',
        }, (error) => {
            if (error) {
                console.log(`몽고 DB 연결 에러 ${error}`);
            } else {
                console.log(`몽고 DB 연결 성공 ${error}`);
            }
        });//mongodb connect
    };//connect

    connect();
    mongoose.connection.on('error', (error)=>{
        console.log(`몽고 DB 연결 에러 : ${error}`);
    });
    mongoose.connection.on('disconnected', ()=>{
        console.error('몽고 DBㅇ 연결이 끊어졌습니다. 연결을 재시도합니다.');
        connect();
    });
};