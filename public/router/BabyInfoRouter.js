const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const generateHashToken = require('../middleware/generateHashToken');
const Validations = require('../middleware/Validations');
const User = require('../scheme/userSchema');
const Baby = require('../scheme/babySchema');

const BabyController = require('../querycontroller/BabyController');
const UserController = require('../querycontroller/UserController');

//이 라우터는 아이의 관한 모든 백엔드 API요청을 처리하는 라우터입니다.

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

//
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_THUMBNAIL_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            let ext = file.mimetype;
            console.log(file);
            if (ext === 'image/png') {
                ext = 'png';
            } else if (ext === 'image/jpeg') {
                ext = 'jpeg';

            } else if (ext === 'image/jpg') {
                ext = 'jpg';

            } else if (ext === 'image/svg') {
                ext = 'svg';

            } else if (ext === 'image/gif') {
                ext = 'gif';

            } else {
                ext = 'png';
            }
            generateHashToken().then((res) => {
                cb(null, `${Date.now()}_${res}_${file.originalname}.${ext}`); //use Date.now() for unique file keys
            });
        },

    })
});

// 아이 수정 요청 처리 라우터
router.post('/update', async (req, res) => {
    try {
        console.log('# 웹 - 아이 수정 요청 시작');
        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;
        const name = req.body.name;
        const weight = req.body.weight;
        const height = req.body.height;
        const bloodType = req.body.bloodType;
        const year = req.body.year;
        const month = req.body.month;
        const date = req.body.date;
        const gender = req.body.gender;

        //s3 key 링크
        const src = req.body.src;

        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyBabyIdx = Validations.isEmpty(babyIdx);
        const isEmptyName = Validations.isEmpty(name);
        const isEmptyWeight = Validations.isEmpty(weight);
        const isEmptyHeight = Validations.isEmpty(height);
        const isEmptyBloodType = Validations.isEmpty(bloodType);
        const isEmptyYear = Validations.isEmpty(year);
        const isEmptyMonth = Validations.isEmpty(month);
        const isEmptyDate = Validations.isEmpty(date);

        const isValidWeight = Validations.checkFloatDoublePoint(weight);
        const isValidHeight = Validations.checkFloatDoublePoint(height);
        const isValidYear = year.length === 4;
        const isValidMonth = month.length === 2;
        const isValidDate = date.length === 2;

        const isValidBloodType = await BabyController.checkBloodType(bloodType);

        const allValid = (!isEmptyBabyIdx && !isEmptyClientIdx && !isEmptyName && !isEmptyWeight && !isEmptyHeight && !isEmptyBloodType && !isEmptyYear && !isEmptyMonth && !isEmptyDate)
            && (isValidBloodType && isValidDate && isValidWeight && isValidHeight && isValidYear && isValidMonth);

        if (allValid) {
            console.log('# 모두 적합 -  수정을 시작합니다.');

            //쿼리 컨트롤러에 넘겨줄 객체 생성;
            const obj = {
                _id: babyIdx,
                parent: clientIdx,
                name: name,
                weight: weight,
                height: height,
                year: year,
                month: month,
                date: date,
                bloodType: bloodType,
                gender: gender,
                src: src
            };

            //수정 쿼리 실행
            const babyUpdate = await BabyController.updateOneBaby(obj);
            //세션 갱신
            // req.session.key = newUserInfo;

            //세션에서 모든 데이터를 관리하므로, 세션을 갱신해 준다. nosql은 정규화보단 집합적으로 관리한다는 것을 잊지 말것.
            //서버로 데이터 보내기
            res.json({
                success: true,
                // session: newUserInfo,
            });

            console.log(babyUpdate);

        } else if (isEmptyClientIdx) {
            throw 'emptyClientIdx'
        } else if (isEmptyBabyIdx) {
            throw 'emptyBabyIdx'
        } else if (isEmptyName) {
            throw 'emptyName';
        } else if (isEmptyYear) {
            throw 'emptyYear'
        } else if (isEmptyMonth) {
            throw 'emptyMonth';
        } else if (isEmptyDate) {
            throw 'emptyDate';
        } else if (isEmptyWeight) {
            throw 'emptyWeight';
        } else if (isEmptyHeight) {
            throw 'emptyHeight';
        }


    } catch (e) {

    } finally {
        console.log('# 웹 - 아이 수정 요청 종료');
    }
});


//아이 등록 요청 처리 라우터
router.post('/register', upload.single('image'), async (req, res) => {
    try {

        console.log('#웹 - 아이 등록 요청 시작');

        console.log(req.body);
        const clientIdx = req.body.clientIdx;
        const name = req.body.name;
        const weight = req.body.weight;
        const height = req.body.height;
        const bloodType = req.body.bloodType;
        const year = req.body.year;
        const month = req.body.month;
        const date = req.body.date;
        const gender = req.body.gender;
        //s3 key 링크
        const src = req.body.src;

        const isEmptySrc = Validations.isEmpty(src);
        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyName = Validations.isEmpty(name);
        const isEmptyWeight = Validations.isEmpty(weight);
        const isEmptyHeight = Validations.isEmpty(height);
        const isEmptyBloodType = Validations.isEmpty(bloodType);
        const isEmptyYear = Validations.isEmpty(year);
        const isEmptyMonth = Validations.isEmpty(month);
        const isEmptyDate = Validations.isEmpty(date);

        const isValidWeight = Validations.checkFloatDoublePoint(weight);
        const isValidHeight = Validations.checkFloatDoublePoint(height);
        const isValidYear = year.length === 4;
        const isValidMonth = month.length === 2;
        const isValidDate = date.length === 2;

        // 이렇게 만든 게 베스트 프랙티스다 라우터안에다가 await하고 쿼리 컨트롤러는 async -> primise 패턴
        const isValidBloodType = await BabyController.checkBloodType(bloodType);

        const allValid = (!isEmptyClientIdx && !isEmptyName && !isEmptyWeight && !isEmptyHeight && !isEmptyBloodType && !isEmptyYear && !isEmptyMonth && !isEmptyDate)
            && (isValidBloodType && isValidDate && isValidWeight && isValidHeight && isValidYear && isValidMonth);

        if (allValid) {
            console.log('#모든 값이 정상입니다.');

            //등록하는 게 없어졌는데, 누가 썼는지는 알아져야 해서, 로그로만 쓰라해서,
            //사용자 계정에 디바이스 3개 스키마,
            // 디바이스의 시리얼 번호는 계속 추가할 수 있게, 1번 피피..2번 피피, 3번 피피,

            //0. 기존 아이가 존재하는 지 검색하여 존재한다면 defaultBaby:false, 아이가 없던 유저라면 defaultBaby:true
            const hasBaby = await BabyController.countUserBabies(clientIdx);

            //아이 스키마 생성
            const baby = new Baby({
                parent: clientIdx,
                name: name,
                defaultBaby: hasBaby === 0, //기본 선택 아기, 나중에 아이를 삭제 했을 떄 남은 아이가 한 명이라면 그 아이는 true로
                gender: gender,
                year: year,
                month: month,
                date: date,
                bloodType: bloodType,
                weight: weight,
                height: height,
                createdAt: Date.now(),
                src: isEmptySrc ? null : src, //비어있으면 null을 넣고 아니면 src
            });

            //1. 아이를 저장합니다.
            const babySaveResult = await BabyController.createBaby(baby);
            //아이의 _id
            const babyIdx = babySaveResult._id;
            //부모의 _id
            const parentIdx = babySaveResult.parent;

            //2. 아이의 부모 유저의 babies 필드를 업데이트 한다.(oid);
            const newUserInfo = await UserController.updateBabyId(parentIdx, babyIdx);

            //세션 갱신
            req.session.key = newUserInfo;

            //세션에서 모든 데이터를 관리하므로, 세션을 갱신해 준다. nosql은 정규화보단 집합적으로 관리한다는 것을 잊지 말것.
            //서버로 데이터 보내기
            res.json({
                success: true,
                session: newUserInfo,
            });

        } else if (isEmptyClientIdx) {
            throw 'require'
        } else if (isEmptyName) {
            throw 'emptyName';
        } else if (isEmptyYear) {
            throw 'emptyYear'
        } else if (isEmptyMonth) {
            throw 'emptyMonth';
        } else if (isEmptyDate) {
            throw 'emptyDate';
        } else if (isEmptyWeight) {
            throw 'emptyWeight';
        } else if (isEmptyHeight) {
            throw 'emptyHeight';
        }

    } catch (e) {
        console.log('# 아이 등록 과정 중 에러가 발생했습니다.');
        console.log(`# 에러 종류 : ${e}`);
        return res.json({
            error: true,
            type: e
        })
    } finally {
        console.log('#아이 등록 요청 종료');
    }
});


//아이 삭제 요청 처리 라우터


router.post('/delete', async (req, res) => {
    try {
        console.log('#아이를 삭제합니다.');

        /*
        * 1. 아이를 삭제하고, 아이의 부모의 아이 정보를 갱신, 삭제할 아이가 썸네일이 있는 아이였다면 s3서버의 썸네일을 삭제한다.
        *2. 부모의 id값, 아이의 id값이 필요하다.
        * */

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;

        const isEmptyClient = Validations.isEmpty(clientIdx);
        const isEmptyBaby = Validations.isEmpty(babyIdx);

        //아이 삭제 처리 전에 실행
        if (!isEmptyClient && !isEmptyBaby) {
            console.log('# 아이 삭제시 필요한 값들이 전부 있습니다.');

            //1.아이 삭제
            const deleteResult = await BabyController.deleteOneBaby(clientIdx, babyIdx);

            const isDefaultBaby = deleteResult.defaultBaby;

            //1.삭제한 아이의 defaultBaby가 true라면 다른 아이 중에 가장 처 번째 아이를 true로
            if (isDefaultBaby) {
                const defaultBabyResult = await BabyController.setDefaultBaby(clientIdx);
                console.log(defaultBabyResult);
            }

            //3. 유저의 참조부분 갱신
            const userInfo = await UserController.deleteBabyOID(clientIdx, babyIdx);

            //4. 세션 갱신
            req.session.key = userInfo;

            res.json({
                success: true,
                session: userInfo
            });

        } else if (isEmptyClient) {
            throw 'emptyClientIdx'
        } else if (isEmptyBaby) {
            throw 'emptyBabyIdx'
        }

    } catch (e) {
        console.log(`# 아이 삭제 과정 중 에러 ${e}`);
        return res.json({
            error: true,
            type: e
        });
    }
});


//웹에서 클릭된 아이의 정보 요청을 처리하는 라우터(현재아이)
router.post('/get/info', async (req, res) => {
    try {
        console.log('# 웹에서 현재 아이의 정보 요청 시작');

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;

        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyBabyIdx = Validations.isEmpty(babyIdx);

        const allValid = !isEmptyClientIdx && !isEmptyBabyIdx;

        if (allValid) {
            console.log(`# 요구되는 모든 값들이 있습니다. ${clientIdx},${babyIdx}`);

            const result = await BabyController.findOneBaby(clientIdx, babyIdx);

            res.json({
                success: true,
                currentBaby: result
            });

        } else if (isEmptyBabyIdx) {
            throw 'emptyBabyIdx'
        } else if (isEmptyClientIdx) {
            throw 'emptyClientIdx'
        }


    } catch (e) {
        console.log(e);
        res.json({
            error: true,
            type: e
        })
    } finally {
        console.log('# 현재 아이 정보 요청 처리 끝');
    }
});


//defaultBaby가 true인 아기를 찾아서 반환(기본아기);
router.post('/get/defaultbaby', async (req, res) => {
    try {
        const clientIdx = req.body.clientIdx;

        const defaultBaby = await BabyController.getDefaultBaby(clientIdx);
        console.log("결과 값 ,", defaultBaby);

        if (defaultBaby !== false) {
            res.json({
                success: true,
                currentBaby: defaultBaby
            });
        } else {
            res.json({
                success: false,
            });
        }


    } catch (e) {
        console.log('#에러 ', e);
        res.json({
            error: true,
            type: 'server'
        })
    }
});

router.get('/test', async (req, res) => {
    try {
        //동기식 처리를 해주자. 그래야 값이 넘어간다.
        // const result = await BabyController.createBaby(req.query);
        const val = req.query.parentIdx;
        const babiesLen = await BabyController.countUserBabies(val);

        return res.json(babiesLen);
    } catch (e) {

    }

});


module.exports = router;