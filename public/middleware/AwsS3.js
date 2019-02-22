const aws = require('aws-sdk');

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

exports.s3delete = (key) =>  s3.deleteObject({Bucket: process.env.AWS_BABY_THUMBNAIL_BUCKET, Key: key.substring(key.lastIndexOf('/') + 1, key.length)}, (err, data) => {
    if (err) {
        console.log(err, err.stack);
        throw 'server';
    }  // error
    else {
        console.log('#섬네일 삭제가 완료 되었습니다.');
        console.log(key);
        console.log(data);
    }                // deleted
});//se deleteobject