const mongoose = require('mongoose');

const News = mongoose.model('News', {
    title: {
        type: String,
        required: [true, 'Title required']
    },
    cyrillicTitle: {
        type: String,
        required: [true, 'Cyrillic title required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    },
    body: {
        type: String,
        required: [true, 'Body required']
    },
    photoUrl: {
        type: String,
        required: [true, 'Photo URL required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = News;