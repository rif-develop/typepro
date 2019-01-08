const mongoose = require('mongoose');

const {Schema} = mongoose;

const addressSchema = new Schema({
    /*참조 User를 참조한다.*/
    id: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    address: {
        name: {
            type: String,
            required: false,
        },
        default: {
            type: Boolean,
            required: true,
        },
        recipient: {
            type: String,
            required: true,
        },
        phone: {
            type: Array,
            required: true
        }
    },
    status: {
        lastModified: {
            type: Date,
            required: false
        },
        editCount: {
            type: Number,
            required: false
        }
    }


});

module.exports = mongoose.model('Address', addressSchema);