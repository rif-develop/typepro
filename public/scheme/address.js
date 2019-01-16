const mongoose = require('mongoose');

const {Schema} = mongoose;

const addressSchema = new Schema({
    /*참조 User를 참조한다.*/
    writer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    address: {
        name: {
            type: String,
            required: false,
            default: null
        },
        default: {
            type: Boolean,
            required: true,
        },
        recipient: {
            type: String,
            required: true,
            default: null

        },
        phone: {
            type: Array,
            required: true,
            default: null
        },
        zipCode: {
            type: Number,
            required: true,
            default: null

        },
        address1: {
            type: String,
            required: true,
            default: null
        },
        address2: {
            type: String,
            required: false,
            default: null
        }
    },
    created:{
        type:Date,
        default:Date.now
    }
    //Date.now()를 쓰면 모든 스키마의 시간이 똑같다;
});

module.exports = mongoose.model('Address', addressSchema);