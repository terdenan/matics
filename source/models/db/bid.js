const mongoose = require('mongoose');

const Bid = mongoose.model('Bid', {
    name: {
        type: String,
        required: [true, 'Name required']
    },
    phone: {
        type: String,
        required: [true, 'Phone required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bid;