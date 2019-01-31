const mongoose = require('mongoose');

const {Schema} = mongoose;

const settingSchema = new Schema({
    writer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
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
    }
});

module.exports = mongoose.model('Setting', settingSchema);
