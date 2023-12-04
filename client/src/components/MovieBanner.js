import React from 'react';
import { Link } from 'react-router-dom';
import './CommonStyling.css';

const MovieBanner = ({ movie }) => {

  const handleTitleClick = () => {
    console.log(`Clicked on ${movie.title}`);
  };

  return (
    <div className="movie-banner">
      <img 
        className="banner-image"
        src={movie.imgURL}
        alt={movie.title} 
      />

      <div className="banner-info">
        <Link to={`/movie/${movie.id}`} onClick={handleTitleClick} className='LinkStyle'>
          <h2 className="movie-title">{movie.title}</h2>
        </Link>

        <p className="banner-rating">{movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieBanner;
