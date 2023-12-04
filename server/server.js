const express = require('express')
const mongoose = require('mongoose')
const app = express()
const movies = require('./routes/api/MovieRoutes');
const MovieReview = require('./routes/api/MovieReviewRoutes');

const uri = "mongodb+srv://joh0918:RmLZCl6ytxkCfG6B@cluster0.1rf1mcp.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('Connect successfully')
    } catch (error) {
        console.log('Connect failure')
        console.log(error)    
    }
}

connect();

app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/review', MovieReview);


app.listen(5000, () => {
    console.log('Server started on port 5000')
})

module.exports = app;