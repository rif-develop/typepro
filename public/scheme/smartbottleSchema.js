const mongoose = require('mongoose');
const {Schema} = mongoose;

const smartbottleSchema = new Schema({
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
                autoIndex: false,
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
            createdAt: {
                type: Date,
            },
            temperature: {
                type: Number,
            },
            angle: {
                type: Number,
            }
        }
    ]
});

module.exports = mongoose.model('Smartbottle', smartbottleSchema);