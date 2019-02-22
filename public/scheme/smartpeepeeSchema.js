const mongoose = require('mongoose');
const {Schema} = mongoose;

const smartpeepeeSchema = new Schema({
    data: [
        {
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
            serialNumber: {
                type: String,
            },
            macAddress: {
                type: String,
            },
            firmware: {
                type: String,
            },
            feedTime: {
                type: Date,
            },
            temperature: {
                type: Number,
            },
            angle: {
                type: Number,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }
    ]
});

module.exports = mongoose.model('Smartpeepee', smartpeepeeSchema);