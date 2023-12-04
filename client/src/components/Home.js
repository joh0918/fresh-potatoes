import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Header from './Header';
import MovieBanner from './MovieBanner';
import './CommonStyling.css';

function Home() {

  const [movies, setMovies] = useState([]);
  const [topMovie, setTopMovie] = useState(null); 

  useEffect(() => {
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data);
        const topMovieFromData = response.data.find(movie => movie.isTopRating);
        if (topMovieFromData) {
          setTopMovie(topMovieFromData);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const [current, setCurrent] = useState(0);

  const displayMovies = movies.slice(current, current + 4);

  const prevMovies = () => {
    setCurrent(current => Math.max(current - 4, 0));
  }

  const nextMovies = () => {
    setCurrent(current => Math.min(current + 4, movies.length - 4));
  }

 
  return (
    <div className='home'>
      <h1 className='title'>Fresh Potatoes</h1>
      <Header />
      <div className='movie-banner-container'>
        {topMovie && (
          <MovieBanner
            movie={topMovie}
          />
        )}
      </div>

      <div className='movie-cards-container'>
        <button onClick={prevMovies}>←</button>
        {displayMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
        <button onClick={nextMovies}>→</button>
      </div>
    </div>
  );
}

export default Home;
