const Nexmo = require('nexmo');
require('dotenv').config();

const nexmo = new Nexmo({
    apiKey: '01583244',
    apiSecret: 'Un3Moscs0V2fb3Db'
},{
    debug:true
});
let verifyRequestId = null; // use in the check process

nexmo.verify.request({
    number: '821083963007',
    brand: '리틀원 테스트'
}, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        verifyRequestId = result.request_id;
        console.log('request_id', verifyRequestId);
    }
});

// nexmo.verify.check({
//     request_id: REQUEST_ID,
//     code: CODE
// }, (err, result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });
