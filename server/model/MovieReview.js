const mongoose = require('mongoose');

const MovieReviewSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  review: {
    type: String,
    required: true,
  },
  isFriend: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MovieReview', MovieReviewSchema);
