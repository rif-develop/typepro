const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Validations = require('../middleware/Validations');
const AddressSchema = require('../scheme/addressSchema');
const router = express.Router();
//컨트롤러
const AddressController = require('../querycontroller/AddressController');
const UserController = require('../querycontroller/UserController');

//formData parse하기 위해서 필요한 것 nodejs 는 기본적으로 파싱하는 것이 없다.

//배송지 등록 처리 라우터
router.post('/register', async (req, res) => {

    console.log(req.body);

    const clientIdx = req.body.idx;
    const addressName = req.body.addressName;
    const defaultAddress = req.body.default || false;
    const recipientName = req.body.recipientName;
    const recipientPhone = req.body.recipientPhone;
    const otherPhone = req.body.otherPhone;
    const zipCode = req.body.zipCode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;

    const isEmptyClientIdx = Validations.isEmpty(clientIdx);
    const isEmptyAddressName = Validations.isEmpty(addressName);
    const isEmptyRecipientName = Validations.isEmpty(recipientName);
    const isEmptyRecipientPhone = Validations.isEmpty(recipientPhone);
    const isEmptyZipCode = Validations.isEmpty(zipCode);
    const isEmptyAddress1 = Validations.isEmpty(address1);

    const allValid = !isEmptyClientIdx && !isEmptyAddressName && !isEmptyRecipientName && !isEmptyRecipientPhone && !isEmptyZipCode && !isEmptyAddress1;

    try {

        if (allValid) {
            //배송지 개수 검사 (3개 미만)
            const addressesCount = await AddressController.checkAddressCount(clientIdx);

            //배송지가 3개 이상이면 금지
            if (addressesCount >= 3) {
                throw 'maxCount'
            }

            //스키마에 할당전 객체화
            const addressObject = new AddressSchema({
                writer: clientIdx,
                address: {
                    name: addressName,
                    default: defaultAddress,
                    recipient: recipientName,
                    phone: [recipientPhone, otherPhone],
                    zipCode: zipCode,
                    address1: address1,
                    address2: address2
                }
            });

            //1.데이터 베이스에 저장합니다.
            const saveAddress = await AddressController.saveAddress(addressObject);
            // 기본 배송지로 설정되었는 지 확인
            const isAdressDefault = saveAddress.address.default;
            // 배송지의 _id값.
            const addressIdx = saveAddress._id;

            //2.만약 디폴트 값이 트루라면 기본배송지로 설정 후 나머지 배송지는 false로 변경.
            if (isAdressDefault) { //
                await AddressController.setDefaultAddress(addressIdx);
            }
            //3. 유저 정보에 업데이트한다.
            const updateToUser = await UserController.updateAddressId(clientIdx, addressIdx);

            //4. 배송지 정보 반환
            const addressList = await AddressController.getAddresses(clientIdx);

            console.log(addressList);
            //5. 클라이언트에 반환
            res.json({
                success: true,
                addressList: addressList
            });
        } else if (isEmptyClientIdx) {
            throw 'emptyClientIdx';
        } else if (isEmptyAddressName) {
            throw 'emptyAddressName';
        } else if (isEmptyRecipientName) {
            throw 'emptyRecipientName';
        } else if (isEmptyRecipientPhone) {
            throw 'emptyRecipientPhone';
        } else if (isEmptyZipCode) {
            throw 'emptyZipCode';
        } else if (isEmptyAddress1) {
            throw 'emptyAddress1';
        }


    } catch (e) {
        console.log('#배송지 저장 처리 과정에서 서버 에러가 발생했습니다.');
        console.log(e);
        res.json({
            error: true,
            type: e
        })

    }


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
            error: true,
            type: 'required'
        });
    }

    console.log('#배송지 수정을 시작합니다.');
    console.log('# ..들어온 값');
    console.log(req.body);


    try {
        await AddressSchema.updateMany({
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

                AddressSchema.find({
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
                            type: 'server'
                        })
                    }
                });
            }

            if (err) {
                console.log('# 배송지 수정에 실패했습니다.');
                res.json({
                    error: true,
                    type: 'server'
                })
            }

        })

    } catch (err) {
        res.json({
            error: true,
            type: 'server'
        })
    }

});

//삭제
router.post('/remove', async (req, res) => {

    try {
        console.log('# 배송지 목록 삭제 요청됨');
        console.log(`삭제할 문서의 _id: ${req.body.docsIdx}`);
        console.log(`삭제할 배송지의 작성자 : ${req.body.writerIdx}`);

        const addressIdx = req.body.docsIdx;
        const clientIdx = req.body.writerIdx;
        //1. 배송지 삭제
        const deletedAddrss = await AddressController.deleteAddress(addressIdx, clientIdx);

        //기본값이었떤 아이였는지 체크
        const isDefaultBaby = deletedAddrss.address.default;
        console.log('기본 아이 : ', isDefaultBaby);

        //2. 유저의 배송지 참조 객체(OID) 삭제
        await UserController.deleteAddressesOID(addressIdx, clientIdx);

        //3. 배송지의 남아있는 개수를를 반환합니다.
        const addressListLen = await AddressController.checkAddressCount(clientIdx);


        console.log(addressListLen);
        console.log(addressListLen);

        //3.삭제시 default가 true이며 남아있는 배송지가 있다면, 가장 빨리 만들어진 배송지를 default:true로 설정한다.
        if (addressListLen > 0 && isDefaultBaby) {
            await AddressController.setDefaultTrueLeftOne(clientIdx);
        }

        //4. 현재 배송지 정보를 반환합니다.
        const addressList = await AddressController.getAddresses(clientIdx);

        console.log(addressList);

        res.json({
            success: true,
            addressList: addressList
        })


        //3. 세션 갱신 및 유저정보 반환
    } catch (e) {
        console.log('# 삭제 중에 에러가 일어났습니다 : ', e);
        res.json({
            error: true,
            type: e
        });
    } finally {
        console.log('# 배송지 목록 삭제 요청 종료');
    }
});

//기능 : 배송지 목록 불러오기
router.post('/get/address', async (req, res) => {
    try {
        console.log('# 배송지 목록 불러오기 요청');
        const clientIdx = req.body.id;

        const doc = await AddressController.getAddresses(clientIdx);

        res.json({
            success: true,
            addressList: doc
        });

    } catch (e) {
        console.log('# 에러 발생: ', e);
        res.json({
            error: true,
            type: e
        });
    } finally {
        console.log('# 배송지 목록 불러오기 요청 종료');
    }
});


//기능 기본배송지로 설정

router.post('/default',async (req, res) => {
    console.log('# 기본 배송지로 설정 요청.');
    //일단 요청된 조건으로 배송지를 검색하여 배송지의 default요소를 true로 바꿔준 후, 같은 writeridx의 배송지들은 false로 한다.
    console.log(req.body);

    const addressIdx = req.body.docsIdx;
    const clientIdx = req.body.writerIdx;

    try{
        //기본 배송지로 설정한다.
        await AddressController.setDefaultAddress(addressIdx);
        //갱신된 배송지 리스트 반환;
        const addressList = await AddressController.getAddresses(clientIdx);

        res.json({
            success:true,
            addressList:addressList
        });

    } catch (e) {
        console.log(e);
        res.json({
            error:true,
            type:e
        })
    } finally {
        console.log('# 기본 배송지로 설정 요청 종료');
    }
});

//수정할 배송지 데이터 가져오기

router.post('/fetchingdata', async (req, res) => {
    console.log('# 수정할 데이터를 가져옵니다.');
    try {
        await AddressSchema.findOne({
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