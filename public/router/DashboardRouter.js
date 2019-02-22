const express = require('express');
const router = express.Router();
const app = express();
const {headerCheck} = require('../middleware/HeaderCheck');
const Smartbottle = require('../scheme/smartbottleSchema');
const Baby = require('../scheme/babySchema');

//스마트 보틀 라우터
router.post('/smartbottle', async (req, res) => {
    try {
        headerCheck(req, res);
        console.log('#스마트 보틀 데이터 요청');

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const serialNumber = req.body.serialNumber;
        const macAddress = req.body.macAddress;
        const firmware = req.body.firmware;
        //data
        const feedTime = req.body.feedTime;
        const temperature = req.body.temperature;
        const angle = req.body.angle;

        //1. 보내고자 하는 아이가 존재하는지 확인.
        //2. 도큐먼트가 만들어져 있는지 없는지 확인해서 있으면 업데이트 push로 넣기, 없으면 새로 생성
        //3.

        //들어온 데이터 배열
        const data = req.body.data;

        //데이터 부분만 따로 떄어내서 푸쉬;
        let arr = [];

        data.forEach((ele, key) => {
            ele.serialNumber = serialNumber;
            ele.macAddress = macAddress;
            ele.firmware = firmware;
            ele.owner = clientIdx;
            ele.baby = babyIdx;
            arr.push(ele);
        });
        console.log('배열');
        console.log(arr);




        const smartbottle = new Smartbottle({
            data: arr
        });

        smartbottle.save().then((result) => {
            console.log(result);
        });


        return res.json({
            response: 'success',
            msg: '스마트 보틀 데이터가 들어옴'
        });


    } catch (e) {

    } finally {

    }
});


//스마트 피피 라우터
router.post('/smartpeepee', async (req, res) => {

    try {
        headerCheck(req, res);

        console.log('#스마트 피피 데이터 요청');
        console.log(req.body);
        return res.json({
            response: 'success',
            msg: '스마트 피피 데이터가 들어옴'
        });
    } catch (e) {

    } finally {

    }
});

//스마트 템프 라우터
router.post('/smarttemp', async (req, res) => {
    try {
        headerCheck(req, res);

        console.log(req.body);
    } catch (e) {

    } finally {

    }
});

module.exports = router;