const mongoose = require('mongoose');

const Subscriber = mongoose.model('Subscriber', {
    email: {
        type: String,
        required: [true, 'Email required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Subscriber;