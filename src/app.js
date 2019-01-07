const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');

const app = express();

app.use(bodyParser.json());

const server = app.listen(5000);
const nexmo = new Nexmo({
    //Don't forget to add your keys to the .env file! See .env.example for more info
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

app.post('/request', (req, res) => {
    // A user registers with a mobile phone number
    let phoneNumber = req.body.number;

    console.log(phoneNumber);

    nexmo.verify.request({number: phoneNumber, brand: 'Awesome Company'}, (err, result) => {
        if(err) {
            console.log(err);

            //Oops! Something went wrong, respond with 500: Server Error
            res.status(500).send({error_text: err.message});
        } else {
            console.log(result);

            if(result && result.status == '0') {
                //A status of 0 means success! Respond with 200: OK
                res.status(200).send(result);
            } else {
                //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
                //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
                res.status(400).send(result);
            }
        }
    });
});

app.post('/check', (req, res) => {
    //To verify the phone number the the request ID and code is required.
    let code = req.body.code;
    let requestId = req.body.request_id;

    console.log("Code: " + code + " Request ID: " + requestId);

    nexmo.verify.check({request_id: requestId, code: code}, (err, result) => {
        if(err) {
            console.log(err);

            //Oops! Something went wrong, respond with 500: Server Error
            res.status(500).send({error_text: err.message});
        } else {
            console.log(result)

            if(result && result.status == '0') {
                //A status of 0 means success! Respond with 200: OK
                res.status(200).send(result);
                console.log('Account verified!');
            } else {
                //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
                //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
                res.status(400).send(result);
                console.log('Error verifying account');
            }
        }
    });
});

app.post('/cancel', (req, res) => {
    //User sends the request id to cancel the verification request
    let requestId = req.body.request_id;

    console.log("Request ID: " + requestId);

    nexmo.verify.control({request_id: requestId, cmd:'cancel'}, (err, result) => {
        if(err) {
            console.log(err);

            //Oops! Something went wrong, respond with 500: Server Error
            res.status(500).send({error_text: err.message});
        } else {
            if(result && result.status == '0') {
                //A status of 0 means the verify request was succesfully cancelled! Respond with 200: OK
                res.status(200).send(result);
            } else {
                //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
                //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
                res.status(400).send(result);
            }
        }
    });
});

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