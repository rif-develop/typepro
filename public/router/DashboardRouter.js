const express = require('express');
const router = express.Router();

const {headerCheck} = require('../middleware/HeaderCheck');


router.post('/', async (req, res) => {
    console.log(req);
});
//스마트 보틀 라우터
router.post('/smartbottle', async (req, res) => {
    try {
        headerCheck();
        console.log(req.body);

    } catch (e) {

    } finally {

    }
});


//스마트 피피 라우터
router.post('/smartpeepee', async (req, res) => {
    try {
        headerCheck();
        console.log(req.body);
    } catch (e) {

    } finally {

    }
});

//스마트 템프 라우터
router.post('/smarttemp', async (req, res) => {
    try {
        headerCheck();
        console.log(req.body);
    } catch (e) {

    } finally {

    }
});

module.exports = router;