const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const generateHashToken = require('../middleware/generateHashToken');
const router = express.Router();
const fs = require('fs');
const User = require('../scheme/user');
const Validation = require('../middleware/Validations');
//AWS 설정

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


const acceptableFormat = ['image/jpg', 'image/jpeg', 'image/svg', 'image/png', 'image/gif'];

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

router.post('/image', upload.single('image'), async (req, res) => {
    console.log('# 이미지 업로드 요청 시작');
    try {
        const clientIdx = req.body.clientIdx;
        const location = req.file.location;
        console.log(`${clientIdx} 썸네일 이미지 업데이트를 시작합니다.`);
        console.log(`aws s3 location : ${location}`);
        const isEmptyId = Validation.isEmpty(clientIdx);
        const isEmptyLocation = Validation.isEmpty(req.file.location);

        //파일 스키마에 컬렉션 생성;
        if (!isEmptyId && !isEmptyLocation) {

            //s3에서 기존에 있던 썸네일 파일 삭제하기.
            // 먼저 썸네일이 있는지 확인하고 썸네일이 있다면 삭제후 s3에서도 삭제
            await User.findOne({
                _id: clientIdx,
                thumbnail: {$ne: null}
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('# 썸네일 이미지가 있습니다.');
                    console.log(docs.thumbnail);

                    const key = docs.thumbnail;
                    const s3Key = key.substring(key.lastIndexOf('/') + 1, key.length);
                    console.log(`삭제할 키 값 : ${key}`);
                    const params = {Bucket: process.env.AWS_THUMBNAIL_BUCKET, Key: s3Key};

                    s3.deleteObject(params, function (err, data) {
                        if (err) {
                            throw 'server'
                        }
                        if (data) {
                            console.log('s3에서 기존의 이미지를 삭제했습니다.');
                        }
                    });
                }
            });


            //유저의 썸네일 부분을 업데이트 시키기
            await User.findOneAndUpdate({_id: clientIdx}, {$set: {'thumbnail': location, 'status.lastModifiedThumbnail': Date.now()}}, {
                new: true,
                $setOnInsert: true,
                multi: true
            }).lean().exec((err, docs) => {
                if (err) {
                    throw 'server'
                }

                if (docs) {
                    console.log('# 썸네일 업데이트에 성공하였습니다.');
                    console.log(docs);

                    //현재 세션에 업데이트된 정보를 반영
                    req.session.key = docs;
                    return res.json({
                        success: true,
                    });
                } else {
                    console.log('# 썸네일 업데이트를 하지 않았습니다.')
                }
            });

        } else if (isEmptyId) {
            throw 'emptyId'
        } else if (isEmptyLocation) {
            throw 'emptyLocation'
        }

    } catch (e) {
        console.log(e);
        if (e === 'emptyId') {
            return res.json({
                error: true,
                type: e
            });
        } else if (e === 'emptyLocation') {
            return res.json({
                error: true,
                type: e
            })
        }
    } finally {
        console.log('# 이미지 업로드 요청 끝');

    }

});

//썸네일 이미지 삭제 요청 핸들링 라우터
router.post('/image/delete', async (req, res) => {
    console.log('#s3 썸네일 삭제 요청');
    console.log(req.body);
    try {
        let key = req.body.key;
        const clientIdx = req.body.clientIdx;
        const isEmptyKey = Validation.isEmpty(key);
        const isEmptyClientIdx = Validation.isEmpty(clientIdx);
        if (isEmptyKey) {
            throw "required";
        } else {
            console.log('# 썸네일 삭제를 시작합니다..');

            //s3 url에서 키 값만 잘라내기
            const s3Key = key.substring(key.lastIndexOf('/') + 1, key.length);
            console.log(`삭제할 키 값 : ${key}`);
            const params = {Bucket: process.env.AWS_THUMBNAIL_BUCKET, Key: s3Key};

            s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    throw 'server';
                }  // error
                else {
                    console.log('#삭제가 완료 되었습니다.');
                    //데이터 베이스 유저 갱신 및 세션 갱신;

                    User.findOneAndUpdate({
                        _id: clientIdx,
                        thumbnail: key
                    }, {$set: {'thumbnail': null}}, {new: true}).lean().exec((err, docs) => {
                        if (err) {
                            throw 'server'
                        }

                        if (docs) {
                            console.log('#썸네일을 삭제했습니다.');
                            console.log(docs);
                            //세션 갱신
                            req.session.key = docs;
                            return res.json({
                                success: true
                            });
                        }
                    });


                    console.log(data);
                }                // deleted
            });//se deleteobject

        }

    } catch (e) {
        console.log(e);
        return res.json({
            error: true,
            type: e
        });
    }
});


const listBuckets = (req, res) => {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            return res.send({"error": err});
        }
        res.send({data});
    });
};


module.exports = router;
