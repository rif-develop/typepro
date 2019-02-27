const mongoose = require('mongoose');
const {Schema} = mongoose;
const Baby = require('./babySchema');
const User = require('./userSchema');

const babySchema = new Schema({
    parent: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    defaultBaby: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    gender: {
        type: String,
    },
    weight: {
        type: String,
    },
    height: {
        type: String,
    },
    year: {
        type: String,
    },
    month: {
        type: String,
    },
    date: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    createdAt: {
        type: Date,
        default:Date.now,
        required: true
    },
    src: {
        required: false,
        type: String,
    }
});


module.exports = mongoose.model('Baby', babySchema);