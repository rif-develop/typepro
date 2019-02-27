const express = require('express');
const router = express.Router();

const Validation = require('../middleware/Validations');

//앱 검사
const {headerCheck} = require('../middleware/HeaderCheck');

//스키마
const Smartbottle = require('../scheme/smartbottleSchema');
const Smartpeepee = require('../scheme/smartpeepeeSchema');
const Smarttemp = require('../scheme/smarttempSchema');
const Baby = require('../scheme/babySchema');

//컨트롤러
const SmartbottleController = require('../querycontroller/SmartbottleController');
const SmartpeepeeController = require('../querycontroller/SmartpeepeeController');
const SmarttempController = require('../querycontroller/SmarttempController');

//소켓 통신


//스마트 보틀 라우터

router.post('/smartbottle', async (req, res) => {
    try {
        //리틀원 어플리케이션에서 보낸 데이터인지 확인
        headerCheck(req, res);

        console.log('#스마트 보틀 데이터 요청');

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const serialNumber = req.body.serialNumber;
        const macAddress = req.body.macAddress;
        const firmware = req.body.firmware;
        // require('../socketEvent/smartBottleEmit')(clientIdx)('zzzzz');


        //들어온 데이터 배열
        const data = req.body.data;
        console.log(data);

        // io.sockets.in('5c750b1a08edf25f97f2fb70').emit('get smartbottle', data);

        //데이터 부분만 따로 떄어내서 푸쉬;
        let arr = [];

        data.forEach((ele, key) => {
            ele.serialNumber = serialNumber;
            ele.macAddress = macAddress;
            ele.firmware = firmware;
            ele.baby = babyIdx;
            arr.push(ele);
        });


        //존재하는 회원의 아이인지 확인
        const clientHasData = await SmartbottleController.findOneBaby(clientIdx, babyIdx);

        //이미 기존의 들어온 데이터가 존재한다면 거기에 계속 덧붙여 나간다.
        if (clientHasData.length > 0) {

            Smartbottle.findOneAndUpdate({
                owner: clientIdx,
                baby: babyIdx
            }, {
                $addToSet: {
                    'data': data
                }
            }, {
                new: true,
                multi: true,
                $setOnInsert: true
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }
            });
            console.log('# 서버로 들어온 데이터 개수 : ', data.length);
        } else {

            //데이터가 없는 회원이라면 새로 만든다.
            const smartBottle = new Smartbottle({
                owner: clientIdx,
                baby: babyIdx,
                data: arr
            });

            smartBottle.save().then((result) => {
                console.log(result);
            });
        }

        return res.json({
            response: 'success',
            msg: '스마트 보틀 데이터 서버 저장 성공'
        });


    } catch (e) {
        console.log(e);
        res.json({
            error: true,
            type: 'server'
        })
    } finally {
        console.log('# 스마트 보틀 서버 요청 종료');
    }
});


//스마트 피피 라우터
router.post('/smartpeepee', async (req, res) => {
    try {
        //리틀원 어플리케이션에서 보낸 데이터인지 확인
        await headerCheck(req, res);
        console.log(req.body);


        console.log('#스마트 피피 데이터 요청');

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const serialNumber = req.body.serialNumber;
        const macAddress = req.body.macAddress;
        const firmware = req.body.firmware;
        const type = req.body.type;

        //들어온 데이터 배열
        const data = req.body.data;

        // require("../socketEvent/smartPeepeeEmit")(clientIdx)('kin');


        //데이터 부분만 따로 떄어내서 푸쉬;
        let arr = [];

        await data.forEach((ele, key) => {
            ele.serialNumber = serialNumber;
            ele.macAddress = macAddress;
            ele.firmware = firmware;
            ele.type = type;
            ele.baby = babyIdx;
            arr.push(ele);
        });

        // io.sockets.in('5c750b1a08edf25f97f2fb70').emit('get smartpeepee', data);

        //존재하는 회원의 아이인지 확인
        const clientHasData = await SmartpeepeeController.findOneBaby(clientIdx, babyIdx);

        //이미 기존의 들어온 데이터가 존재한다면 거기에 계속 덧붙여 나간다.
        if (clientHasData.length > 0) {

            await Smartpeepee.findOneAndUpdate({
                owner: clientIdx,
                baby: babyIdx
            }, {
                $addToSet: {
                    'data': data
                }
            }, {
                new: true,
                multi: true,
                $setOnInsert: true
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }
            });
            console.log('# 서버로 들어온 데이터 개수 : ', data.length);
        } else if (clientHasData.length === 0) {

            //동시에 2개 이상의 데이터베이스 생성 요청이 들어 오면 데이터베이스가 요청 수만큼 생겨버리기에 저장 직전에 한 번 더 검사한다.
            const clientHasData = await SmartpeepeeController.findOneBaby(clientIdx, babyIdx);

            if (clientHasData.length > 0) {
                console.log('2번 만드는 것 방지');
                return;
            }

            //데이터가 없는 회원이라면 새로 만든다.
            const smartPeepee = new Smartpeepee({
                owner: clientIdx,
                baby: babyIdx,
                data: arr
            });

            await smartPeepee.save().then((result) => {
                console.log(result);
            });
        }

        return res.json({
            response: 'success',
            msg: '스마트 피피 서버 저장 완료'
        });


    } catch (e) {
        console.log(e);
        res.json({
            error: true,
            type: 'server'
        })
    } finally {
        console.log('# 스마트 피피 서버 요청 종료');
    }
});

//스마트 템프 라우터
router.post('/smarttemp', async (req, res) => {
    try {
        //리틀원 어플리케이션에서 보낸 데이터인지 확인
        headerCheck(req, res);

        console.log('#스마트 템프 데이터 요청');

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const serialNumber = req.body.serialNumber;
        const macAddress = req.body.macAddress;
        const firmware = req.body.firmware;

        //들어온 데이터 배열
        const data = req.body.data;
        console.log(data);

        //데이터 부분만 따로 떄어내서 푸쉬;
        let arr = [];

        data.forEach((ele, key) => {
            ele.serialNumber = serialNumber;
            ele.macAddress = macAddress;
            ele.firmware = firmware;
            arr.push(ele);
        });

        //존재하는 회원의 아이인지 확인
        const clientHasData = await SmarttempController.findOneBaby(clientIdx, babyIdx);

        //이미 기존의 들어온 데이터가 존재한다면 거기에 계속 덧붙여 나간다.
        if (clientHasData.length > 0) {

            Smarttemp.findOneAndUpdate({
                owner: clientIdx,
                baby: babyIdx
            }, {
                $addToSet: {
                    'data': data
                }
            }, {
                new: true,
                multi: true,
                $setOnInsert: true
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }
            });
            console.log('# 서버로 들어온 데이터 개수 : ', data.length);
        } else {

            //데이터가 없는 회원이라면 새로 만든다.
            const smartTemp = new Smarttemp({
                owner: clientIdx,
                baby: babyIdx,
                data: arr
            });

            //템프 데이터 저장
            smartTemp.save().then((result) => {
                console.log(result);
            });
        }

        return res.json({
            response: 'success',
            msg: '스마트 템프 서버 저장 완료'
        });


    } catch (e) {
        console.log(e);
        res.json({
            error: true,
            type: 'server'
        })
    } finally {
        console.log('# 스마트 템프 서버 요청 종료');
    }
});


//해당 날짜의 데이터 요청
router.post('/get/data', async (req, res) => {
    try {
        console.log('웹 - 디바이스 데이터 요청 시작');
        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const date = req.body.date;

        const isEmptyClientIdx = Validation.isEmpty(clientIdx);
        const isEmptyBabyIdx = Validation.isEmpty(babyIdx);
        const isEmptyDate = Validation.isEmpty(date);

        const allValid = !isEmptyDate && !isEmptyClientIdx && !isEmptyBabyIdx;

        let specificDate = new Date(date); //mongodb ISODate(date), Date.now


        if (allValid) {
            //스마트보틀, 스마트피피, 스마트템프의 해당 날짜에 대한 데이터를 검색하여 마지막 데이터를 반환한다.
            //
            // console.log('들어온 date는 string이니,  date 타입으로 바꿔줘야 한다.');
            //aggregate쓸 때는 lean()을 쓰지 말 것. //diaper 기저귀 교채 //defecation 배변

            //GMT + 9 T뒤에 시간에 9더하라.
            //ex 23T15 === 24일 00시. GTE
            //ex 24T15 === 25일 00시 LT


            //1. 해당 날짜에 스마트 보틀의 마지막 수유시간을 가져온다.
            const bottleData = await SmartbottleController.getLastFeedingTime(specificDate, babyIdx);
            console.log('마지막 수유 시간 : ', bottleData);

            //스마트 보틀 마지막 수유시간

            //배변 횟수 및 마지막 배변 시간 반환
            const peepeeData = await SmartpeepeeController.getLastDefecationTimeAndCount(specificDate, babyIdx);
            console.log(peepeeData);

            res.json({
                success: true,
                bottleData: {
                    lastCreatedAt: bottleData
                },
                peepeeData: {
                    defecationCount: peepeeData[0].count,
                    lastCreatedAt: peepeeData[0].lastDate
                }
            });

        } else if (isEmptyClientIdx) {
            throw 'emptyClientIdx';
        } else if (isEmptyBabyIdx) {
            throw 'emptyBabyIdx';
        } else if (isEmptyDate) {
            throw 'emptyDate';
        }

    } catch (e) {
        res.json({
            error: true,
            type: e
        })
    } finally {
        console.log('웹 - 디바이스 데이터 요청 종료');
    }


});


module.exports = router;

