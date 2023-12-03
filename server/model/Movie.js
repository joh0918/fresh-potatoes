const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
    },
    rating: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
