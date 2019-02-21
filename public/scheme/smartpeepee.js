const mongoose = require('mongoose');
const {Schema} = mongoose;

const smartpeepeeSchema = new Schema({
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    data: [
        {
            createdAt: {
                type: Date,
                default: Date.now()
            },
            poopTime: {
                type: Date,
                required: true,
            }
        }
    ]


});

module.exports = mongoose.model('Smartpeepee', smartpeepeeSchema);