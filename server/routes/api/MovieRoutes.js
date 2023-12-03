const express = require('express');
const router = express.Router();
const Movie = require('../../model/Movie'); 

// @route   GET api/movies
router.get('/', (req, res) => {
    Movie.find()
        .then((movies) => res.json(movies))
        .catch((err) => res.status(404).json({ msg: 'No movies found' }));
});

// @route   GET api/movies/:id
router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then((movie) => res.json(movie))
        .catch((err) => res.status(404).json({ msg: 'Movie not found' }));
});

// @route   POST api/movies
router.post('/', async (req, res) => {
    Movie.create(req.body)
        .then((item) => res.json({ msg: 'Movie added successfully' }))
        .catch((err) => res.status(400).json({ msg: 'Unable to add this movie', error: err.message }));
});

// @route   PUT api/movies/:id
router.put('/:id', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
        .then((movie) => res.json({ msg: 'Movie updated successfully' }))
        .catch((err) => res.status(400).json({ msg: 'Unable to update the database' }));
});

// @route   DELETE api/movies/:id
router.delete('/:id', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then((movie) => res.json({ msg: 'Movie deleted successfully' }))
        .catch((err) => res.status(400).json({ error: 'No such movie' }));
});

module.exports = router;