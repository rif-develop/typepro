const mongoose = require('mongoose');
const {Schema} = mongoose;


const emailSubscriptionSchema = new Schema({
    subscribedAt: {
        type: Date,
        default:Date.now,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('EmailSubscription', emailSubscriptionSchema);