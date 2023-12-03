import React from 'react';
import { Link } from 'react-router-dom';
import './CommonStyling.css';

const MovieCard = ({ movie }) => {
 
  const handleMovieClick = () => {
    // Replace this example logic with the actual functionality to navigate to the movie page
    console.log(`Clicked on ${movie.title}`); // Example: Output the movie title on click
  };

  return (
    <Link to={`/movie/${movie.id}`}className='LinkStyle'>
      <div className="movie-card">
        <img
          className="movie-poster"
          src={movie.posterURL} 
          alt={movie.title}
          onClick={handleMovieClick}
        />
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
          <p className="movie-rating">Rating: {movie.rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
