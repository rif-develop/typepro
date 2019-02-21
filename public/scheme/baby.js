const mongoose = require('mongoose');
const {Schema} = mongoose;
const Baby = require('./baby');
const User = require('./user');

const babySchema = new Schema({
    parent: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    gender: {
        type: String,
    },
    weight: {
        type: String,
    },
    height: {
        type: String,
    },
    year: {
        type: String,
    },
    month: {
        type: String,
    },
    date: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    defaultCheck: { //앱에서는 무조건 아이가 한 명이 있어야 한다ㅣ. 데이터가 아이에게 맞물리기 떄문에 ,그러니 회원가입시 웹도 아이를 한명 만드는데 default가 false로 해놓고 이 아이를 수정할 때, true로 바꿔준다.
        required: false,
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0
    },
    src: {
        required: false,
        type: String,
    }
});


module.exports = mongoose.model('Baby', babySchema);