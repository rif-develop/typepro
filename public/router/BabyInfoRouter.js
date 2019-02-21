const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const generateHashToken = require('../middleware/generateHashToken');
const Validations = require('../middleware/Validations');
const User = require('../scheme/user');
const Baby = require('../scheme/baby');
const {removeBaby} = require('../query/removeQuery');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const {s3delete} = require('../middleware/AwsS3');


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

//아이 등록 요청 처리 라우터
router.post('/register', upload.single('image'), async (req, res) => {
    try {

        console.log('#아이 등록 요청 시작');

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

        const promo = (bloodType) => new Promise((resolve, reject) => {
            const bloodEnum = ['A', 'B', 'O', 'AB'];

            //혈액형 검사
            bloodEnum.forEach((ele, i) => {
                if (bloodType.indexOf(ele) === 0) {
                    resolve(true)
                } else {
                    reject(false)
                }
            });
        });

        promo(bloodType).then((result) => {
            return result;
        }).then((result) => {

            const isValidBloodType = result;
            const allValid = (!isEmptyClientIdx && !isEmptyName && !isEmptyWeight && !isEmptyHeight && !isEmptyBloodType && !isEmptyYear && !isEmptyMonth && !isEmptyDate)
                && (isValidBloodType && isValidDate && isValidWeight && isValidHeight && isValidYear && isValidMonth);

            if (allValid) {
                console.log('#모든 값이 정상입니다.');
                //등록하는 게 없어졌는데, 누가 썼는지는 알아져야 해서, 로그로만 쓰라해서,
                //사용자 계정에 디바이스 3개 스키마,
                // 디바이스의 시리얼 번호는 계속 추가할 수 있게, 1번 피피..2번 피피, 3번 피피,


                //아이 스키마 생성
                const baby = new Baby({
                    parent: clientIdx,
                    name: name,
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

                console.log('# 데이터 저장 중..');

                //데이터 베이스에 아이 저장


                baby.save(async (err, result) => {
                    if (err) {
                        throw 'server'
                    }


                    const babyId = result._id;
                    const parentId = result.parent;

                    console.log(parentId);

                    //1. 모든 아이의 갯수를 구한다.(현재 부모의 아이디로 아이의 갯수를 구함); 아이의 순번을 정해주기 위해서
                    await Baby.find({
                        parent: parentId
                    }).lean().exec((err, docs) => {
                        if (err) {
                            throw 'server'
                        }

                        if (docs) {
                            console.log('#아이의 수');
                            console.log(docs.length);
                            console.log(docs);

                            //order를 업데이트 해준다.
                            Baby.findOneAndUpdate({_id: babyId, parent: parentId}, {
                                $set: {order: docs.length}
                            }, {new: true, multi: true, $setOnInsert: true}).lean().exec((err, docs) => {
                                if (err) {
                                    throw 'server'
                                }
                                if (docs) {
                                    console.log('# 순서를 업데이트 했습니다.');
                                    console.log(docs);
                                }
                            });
                        }
                    });

                    //유저에 업데이트 해준다. array에 push, 삭제할 떄는 $pull
                    await User.findOneAndUpdate({_id: clientIdx}, {
                        $push: {babies: result._id},
                    }, {
                        new: true,
                        $setOnInsert: true,
                    }).populate({path: 'babies', options: {sort: {'order': 1}}}).exec((err, docs) => {

                        if (err) {
                            throw 'server'
                        }

                        if (docs) {
                            console.log('# 아이 정보를 저장했습니다.');
                            console.log(docs);

                            //세션 갱신
                            req.session.key = docs;

                            //세션에서 모든 데이터를 관리하므로, 세션을 갱신해 준다. nosql은 정규화보단 집합적으로 관리한다는 것을 잊지 말것.
                            //서버로 데이터 보내기
                            return res.json({
                                success: true,
                                session: docs,
                                baby:result
                            });
                        }

                    });//query

                });//end save


            } else if (isEmptyClientIdx) {
                throw 'require'
            }
        }).catch((err) => {
            console.log(err);
            throw 'server';
        });


    } catch (e) {
        console.log('# 아이 등록 과정 중 에러가 발생했습니다.');
        console.log(e);
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

        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;

        console.log(clientIdx, babyIdx);

        const isEmptyClient = Validations.isEmpty(clientIdx);
        const isEmptyBaby = Validations.isEmpty(babyIdx);

        //아이 삭제 처리 전에 실행

        if (!isEmptyClient && !isEmptyBaby) {
            console.log('#삭제시 필요한 값들이 전부 있습니다.');

            //1.아이 삭제
            await Baby.findOneAndRemove({_id: babyIdx, parent: clientIdx}, async (err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('#삭제된 아이');
                    console.log(docs);
                    //s3에 키값이 있는 아이일 경우 s3에서 키 값을 지워준다.
                    const isEmptyS3Key = Validations.isEmpty(docs.src);
                    if (!isEmptyS3Key) {
                        //2.아이가 썸네일이 있는 경우에는 썸네일도 삭제해준다.
                        //s3에서 이미지 삭제
                        console.log('# 썸네일이 있는 아이입니다.');
                        await s3delete(docs.src);
                    }

                }

            });
            //3.유저 babies에 있는 참조하는 oid를 삭제한다.(new:true)를 해야 새로 변경된 값을 반환한다. 잊지 말아라. 여러개 업데이트 할꺼면 multi:true
            await User.findByIdAndUpdate({_id: clientIdx},
                {$pull: {babies: babyIdx}},
                {multi: true, new: true}).populate('babies').exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('#아이 삭제 결과 값');
                    console.log(docs);
                    //세션 갱신 및 클라이언트에 전달
                    req.session.key = docs;

                    res.json({
                        success: true,
                        session: docs
                    });
                }
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
        console.log(req.body);

        const clientIdx = req.body.clientIdx;
        const babyIdx = req.body.babyIdx;

        const isEmptyClientIdx = Validations.isEmpty(clientIdx);
        const isEmptyBabyIdx = Validations.isEmpty(babyIdx);

        const allValid = !isEmptyClientIdx && !isEmptyBabyIdx;

        if (allValid) {
            console.log(`# 요구되는 모든 값들이 있습니다. ${clientIdx},${babyIdx}`);
            Baby.findOne({
                parent: clientIdx,
                _id: babyIdx
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('# 요청된 아이를 반환합니다.');
                    console.log(docs);
                    res.json({
                        success: true,
                        currentBaby: docs
                    });
                }
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


module.exports = router;