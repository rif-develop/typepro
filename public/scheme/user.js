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
        year: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        month: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        date: {
            type: String,
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
    point: {
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
        lastModifiedPw: {
            type: Date,
            required: false,
            default: Date.now
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
        },
        lastModifiedThumbnail: {
            type: Date,
            default: Date.now,
            required: false
        }
    },
    thumbnail: {
        type: String,
        default: null,
        unique: false,
        required: false
    },
    option: {
        memberActivityAlarm: { //그룹원의 활동에 대한 알람을 받을 지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        likeAlarm: { //다른 멤버가 좋아요를 누르면 좋아요를 받는지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        replyAlarm: { //다른 회원이 내 게시물의 다는 댓글의 알람을 받을지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        invitationAlarm: { //초대 신청 및 수락에 대한 알림을 받을 지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        birthdayAlarm: { //본인, 아이, 그룹원 생일 등에 대한 알람을 받을 지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        scheduleAlarm: { //일정에 관한 알람을 받을 지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        connectedDeviceAlarm: { //연동된 디바이스와 관련된 알람을 받을지 여부
            type: Boolean,
            default: true,
            unique: false,
            required: true
        },
        unit: { //온도 및 무게 단위 설정 옵션 usa는 미국식 야드,파운드 인치, si는 meter.kg등
            type: String,
            required: true,
            enum: ['usa', 'si'],
            default: 'si'
        },
        emailSubscription: { //이메일로 이벤트,알림 및 기타 등등을 수신할 지 여
            type: Boolean,
            required: true,
            default: true,
            unique: false,
        }
    },
    babies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Baby'
        }
    ],
    addresses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'
        }
    ]

});
/*User라는 이름으로 userSchema 스키마 객체를 내보낸다.*/
module.exports = mongoose.model('User', userSchema);