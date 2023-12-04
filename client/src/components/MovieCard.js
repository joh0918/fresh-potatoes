import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonStyling.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.title}`);
  };

  return (
    <div className='LinkStyle' onClick={handleMovieClick}>
      <div className="movie-card">
        <img
          className="movie-poster"
          src={movie.imgURL} 
          alt={movie.title}
        />
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
          <p className="movie-rating">Rating: {movie.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
