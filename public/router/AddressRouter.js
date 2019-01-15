const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Address = require('../scheme/address');
const router = express.Router();

//formData parse하기 위해서 필요한 것 nodejs 는 기본적으로 파싱하는 것이 없다.
//등록
router.post('/register', [
    check('addressName').isLength({min: 1, max: 30}).exists().withMessage('addressName'),
    check('recipientPhone').exists().withMessage('recipientPhone'),
    check('recipientName').isLength({min: 1, max: 30}).exists().withMessage('recipientName'),
    check('zipcode').isNumeric().exists().withMessage('zipcode'),
    check('address1').exists().withMessage('address1'),
    check('address2').exists().withMessage('address2')
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }

    //formData 파싱
    console.log(req.body);

    if (req.body) {
        console.log('# 값이 있습니다.');

        //스키마에 할당
        const address = new Address({
            writer: req.body.idx,
            address: {
                name: req.body.addressName,
                default: req.body.default || false,
                recipient: req.body.recipientName,
                phone: [req.body.recipientPhone, req.body.otherPhone],
                zipCode: req.body.zipcode,
                address1: req.body.address1,
                address2: req.body.address2
            }
        });

        //데이터 베이스에 저장
        address.save().then((result) => {
            console.log('# 주소 저장 성공');
            console.log(result)
            res.json({
                success: true,
            })
        }).catch((err) => {
            console.log(err)
            console.log('# 주소 저장 실패');
            res.json({
                success: false
            })
        })

    }//end if~else

});//

//수정,
router.post('/modify', (req, res) => {

    console.log(req.body);
});

//삭제
router.post('/delete', (req, res) => {

});


module.exports = router;