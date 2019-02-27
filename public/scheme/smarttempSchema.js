const mongoose = require('mongoose');
const {Schema} = mongoose;

const smarttempSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    baby: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Baby'
    },
    data: [
        {
            _id: {
                autoIndex: false
            },
            baby:{
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Baby'
            },
            serialNumber: {
                type: String,
            },
            macAddress: {
                type: String,
            },
            firmware: {
                type: String,
            },
            temperature: {
                type: Number,
            },
            createdAt:{//템프는 실시간 데이터이기에 서버에서 들어오는 타임스탬프로 시간 저장
                type:Date,
                default:Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Smarttemp', smarttempSchema);