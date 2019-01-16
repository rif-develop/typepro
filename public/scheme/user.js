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
        first: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        last: {
            type: String,
            required: false,
            unique: false,
            default: null

        }
    },
    birth: {
        year:{
            type: Number,
            required: false,
            unique: false,
            default: null
        },
        month:{
            type: Number,
            required: false,
            unique: false,
            default: null
        },
        date:{
            type: Number,
            required: false,
            unique: false,
            default: null
        }

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
        enum: ['personal', 'enterprise', 'social'],
        default: 'personal'
    },
    grade: {
        type: Number,
        required: false,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        default: 0
    },
    point:{
        type: Number,
        required: false,
        default: 1000
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
            default: Date.now
        },
        lastFindId: {
            type: Date,
            required: false,
            default: Date.now
        },
        lastFindPw: {
            type: Date,
            required: false,
            default: Date.now

        },
        lastModifiedPw:{
          type:Date,
          required:false,
          default:Date.now
        },
        signupDate: {
            type: Date,
            required: false,
            default: Date.now
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
        social: {
            type: Array,
            default: null,
            unique: false
        }
    },


});
/*User라는 이름으로 userSchema 스키마 객체를 내보낸다.*/
module.exports = mongoose.model('User', userSchema);