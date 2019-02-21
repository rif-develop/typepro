const mongoose = require('mongoose');
const {Schema} = mongoose;

const smartbottleSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    data: [
        {
            createdAt: {
                type: Date,
                default: Date.now()
            },
            feedingTime: {
                type: Date,
                required: true,
                default:null
            }
        }
    ]
});

module.exports = mongoose.model('Smartbottle', smartbottleSchema);