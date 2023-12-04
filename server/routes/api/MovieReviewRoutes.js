const express = require('express');
const router = express.Router();
const MovieReview = require('../../model/MovieReview');

// Get all movie reviews
router.get('/', async (req, res) => {
  try {
    const movieReviews = await MovieReview.find();
    res.json(movieReviews);
  } catch (err) {
    console.error('Error fetching movie reviews:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific movie review by ID
router.get('/:id', async (req, res) => {
  try {
    const movieReview = await MovieReview.findById(req.params.id);
    if (!movieReview) {
      return res.status(404).json({ message: 'Movie review not found' });
    }
    res.json(movieReview);
  } catch (err) {
    console.error('Error fetching movie review by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new movie review
router.post('/', async (req, res) => {
  const { movieTitle, username, rating, review } = req.body;

  try {
    const newMovieReview = new MovieReview({
      movieTitle,
      username,
      rating,
      review,
    });

    const savedReview = await newMovieReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error creating movie review:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a movie review by ID
router.put('/:id', async (req, res) => {
  const { movieTitle, username, rating, review } = req.body;

  try {
    const updatedReview = await MovieReview.findByIdAndUpdate(req.params.id, {
      movieTitle,
      username,
      rating,
      review,
    }, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ message: 'Movie review not found' });
    }

    res.json(updatedReview);
  } catch (err) {
    console.error('Error updating movie review:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a movie review by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await MovieReview.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Movie review not found' });
    }
    res.json({ message: 'Movie review deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie review:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
