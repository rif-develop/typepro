const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: false,
        unique: false,
        default: null
    },
    birth: {
        type: Number,
        required: false,
        unique: false,
        default: null

    },
    gender: {
        type: String,
        required: false,
        unique: false,
        default: 'f'

    },
    nickname: {
        type: String,
        required: false,
        unique: false,
        default: null

    },
    terms: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    },
    country: {
        type: String,
        required: false,
        unique: false,
        default: 'ko'
    },
    phone: {
        type: String,
        required: false,
        default: null,
    },
    type: {
        type: String,
        required: false,
        enum: ['personal','enterprise','social'],
        default: 'personal'
    },
    status: {
        visit: {
            type: Number,
            required: false,
            default: 0
        },
        lastVisit: {
            type: Date,
            required: false,
            default: new Date()
        },
        lastFindId: {
            type: Date,
            required: false,
            default: new Date()
        },
        lastFindPw: {
            type: Date,
            required: false,
            default: new Date()

        },
        signupDate: {
            type: Date,
            required: false,
            default: new Date()
        },
        admin: {
            type: Boolean,
            required: false,
            default: false
        },
        token: {
            type: String,
            default: null,
            unique: false
        },
        social:{
            type:Array,
            default:null,
            unique:false
        }
    },


});
/*User라는 이름으로 userSchema 스키마 객체를 내보낸다.*/
module.exports = mongoose.model('User', userSchema);