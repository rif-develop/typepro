const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Address = require('../scheme/addressSchema');
const router = express.Router();

//formData parse하기 위해서 필요한 것 nodejs 는 기본적으로 파싱하는 것이 없다.

//배송지 등록
router.post('/register', [
    check('addressName').isLength({min: 1, max: 30}).exists(),
    check('recipientPhone').isNumeric().exists(),
    check('recipientName').isString().isLength({min: 1, max: 30}).exists(),
    check('zipCode').isNumeric().exists(),
    check('address1').exists(),
    check('address2').exists(),
    check('default').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            error:true,
            type:'required'
        });
    }

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
                zipCode: req.body.zipCode,
                address1: req.body.address1,
                address2: req.body.address2
            }
        });


        try {

            const result = await address.save();         //데이터 베이스에 저장

            if (result.address.default) { //만약 디폴트 값이 트루라면
                await Address.update({_id: {$ne: result._id}}, {$set: {'address.default': false}}, {multi: true}); //저장하는 배송지를 제외한 나머지를 false로
            }

            //갱신된 배송지를 클라이언트 단으로 전송
            await Address.find().where('writer').equals(result.writer).limit(3).lean().exec((err, docs) => {

                console.log('#저장후 배송지 검색 완료');

                if (docs.length > 0) {
                    //검색된 결과 전달
                    res.json(docs);
                }
                //에러
                if (err) {
                    res.json({
                        error: true,
                        type:'server'
                    })
                }
            });

        } catch (e) {
            console.log('#배송지 저장 처리 과정에서 서버 에러가 발생했습니다.');
            res.json({
                error: true,
                type:'server'
            })

        }

    }//end if~else

});//

//# 배송지 수정,
router.post('/modify', [
    check('addressName').isLength({min: 1, max: 30}).exists(),
    check('recipientPhone').isNumeric().exists(),
    check('recipientName').isString().isLength({min: 1, max: 30}).exists(),
    check('zipCode').isNumeric().exists(),
    check('address1').exists(),
    check('address2').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            error:true,
            type:'required'
        });
    }

    console.log('#배송지 수정을 시작합니다.');
    console.log('# ..들어온 값');
    console.log(req.body);


    try {
        await Address.updateMany({
                writer: req.body.writerIdx,
                _id: req.body.docsIdx
            },
            {
                $set: {
                    "address.name": req.body.addressName,
                    "address.recipient": req.body.recipientName,
                    "address.phone.0": req.body.recipientPhone,
                    "address.phone.1": req.body.otherPhone,
                    "address.zipCode": req.body.zipCode,
                    "address.address1": req.body.address1,
                    "address.address2": req.body.address2,
                    "created": Date.now()
                }
            }, {
                new: true
            }
        ).lean().exec((err, docs) => {

            if (docs) {
                console.log('# 배송지 수정에 성공하였습니다.');
                console.log(docs);

                Address.find({
                    writer: req.body.writerIdx,
                }).limit(3).lean().exec((err, docs) => {
                    if (docs.length >= 0) {
                        console.log('#서버로 리턴합니다.');
                        res.json(docs);
                    }

                    if (err) {
                        console.log('문서 삭제후 갱신을 위한 데이터 검색중에 에러가 발생했습니다.');
                        res.json({
                            error: true,
                            type:'server'
                        })
                    }
                });
            }

            if (err) {
                console.log('# 배송지 수정에 실패했습니다.');
                res.json({
                    error: true,
                    type:'server'
                })
            }

        })

    } catch (err) {
        res.json({
            error: true,
            type:'server'
        })
    }

});

//삭제
router.post('/remove', (req, res) => {
    console.log('# 배송지 목록 삭제 요청됨');
    console.log(`삭제할 문서의 _id: ${req.body.docsIdx}`);
    console.log(`삭제할 배송지의 작성자 : ${req.body.writerIdx}`);

    //삭제할 문서 검색
    Address.findOne({
        _id: req.body.docsIdx,
        writer: req.body.writerIdx
    }).deleteOne().exec((err, docs) => {
        if (docs) {
            console.log('# 삭제되었습니다.');
            console.log(docs);
            console.log('------------------------------')

            //리액트에서의 갱신을 위해 문서를 다시 검색해서 return
            Address.find({
                writer: req.body.writerIdx
            }).limit(3).lean().exec((err, docs) => {

                if (docs.length >= 0) {
                    console.log('#서버로 리턴합니다.');
                    res.json(docs);
                }

                if (err) {
                    console.log('문서 삭제후 갱신을 위한 데이터 검색중에 에러가 발생했습니다.');
                    res.json({
                        error: true,
                        type:'server'
                    })
                }


            });
        }


        if (err) {
            console.log('# 삭제 중에 에러가 일어났습니다.');
            res.json({
                error: true,
                type:'server'
            })
        }
    })


});

//기능 : 배송지 목록 불러오기
router.post('/getaddress', (req, res) => {
    console.log('# 배송지 목록 불러오기 요청됨');
    Address.find().where('writer').equals(req.body.id).limit(3).lean().exec((err, docs) => {

        if (docs.length > 0) {
            //검색된 결과 전달
            res.json(docs);
        }
        //에러
        if (err) {
            res.json({
                error: true,
                type:'server'
            })
        }
    });
});


//기능 기본배송지로 설정

router.post('/default', (req, res) => {
    console.log('# 기본 배송지로 설정합니다.');
    //일단 요청된 조건으로 배송지를 검색하여 배송지의 default요소를 true로 바꿔준 후, 같은 writeridx의 배송지들은 false로 한다.

    console.log(req.body.writerIdx);
    console.log(req.body.docsIdx);

    //다른 배송지의  default값은 false로 설정한다.
    Address.update({_id: {$ne: req.body.docsIdx}},
        {$set: {'address.default': false}},
        {multi: true}
    ).then(() => {
        Address.findOneAndUpdate(
            {_id: req.body.docsIdx, writer: req.body.writerIdx},
            {$set: {'address.default': true, 'created': Date.now()}}, {new: true}, (err, docs) => {

                if (err) {
                    console.log('#기본 배송지 설정하는 과정에서 에러 발생');
                    res.json({
                        error: true,
                        type:'server'
                    })
                }

                if (docs) {
                    console.log('#기본 배송지로 성공적으로 업데이트 되었습니다.');
                    console.log(docs);
                    //화면 갱신을 위해 값 새로 리턴
                    Address.find({
                        writer: req.body.writerIdx
                    }, null, {$sort: {created: -1}}).limit(3).lean().exec((err, docs) => {

                        console.log(docs);
                        if (docs) {
                            res.json(docs);
                        }
                        if (err) {
                            res.json(err);
                        }
                    });

                }
            });
    });


});

//수정할 배송지 데이터 가져오기

router.post('/fetchingdata', async (req, res) => {
    console.log('# 수정할 데이터를 가져옵니다.');
    try {
        await Address.findOne({
            _id: req.body.docsIdx,
            writer: req.body.writerIdx
        }).lean().exec((err, docs) => {

            if (docs) {
                res.json(docs);
            }

            if (err) {
                res.json({
                    error: true,
                    type: 'server'
                })
            }
        });
    } catch (e) {
        res.json({
            error: true,
            type: 'server'
        })
    }
});

module.exports = router;