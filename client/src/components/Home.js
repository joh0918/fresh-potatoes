import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import Header from './Header';
import MovieBanner from './MovieBanner';
import './CommonStyling.css';

function Home() {
  const navigate = useNavigate();

  const topmovie = {
    id: 1,
    title: 'Interstellar',
    posterURL: 'https://images3.alphacoders.com/551/thumbbig-551456.webp',
    rating: '🍟9.0/10',
  };

  const [movies] = useState([
    {
        id: '656699bfe625f2913d29f23b',
        title: 'Transformers',
        posterURL: 'https://m.media-amazon.com/images/M/MV5BNWI1NjkxM2MtOTU4My00YzQ5LTliNGMtNmFlM2U5NWM3MDY1XkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_FMjpg_UX1000_.jpg',
        rating: '🍟9.5/10',
    },
    {
        id: 1,
        title: 'The Dark Knight',
        posterURL: 'https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080',
        rating: '🍟9.0/10',
    },
    {
        id: '656699abe625f2913d29f239',
        title: 'Prince of Persia',
        posterURL: 'https://m.media-amazon.com/images/M/MV5BMTMwNDg0NzcyMV5BMl5BanBnXkFtZTcwNjg4MjQyMw@@._V1_FMjpg_UX1000_.jpg',
        rating: '🥔3.2/10',
    },
    {
        id: '65669997e625f2913d29f237',
        title: 'Cars 2',
        posterURL: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Cars_2_Poster.jpg',
        rating: '🥔 4.9/10',
    },
    {
        id: '6566997ee625f2913d29f235',
        title: 'Shrek',
        posterURL: 'https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
        rating: '🍟10/10',
    },
    {
        id: '65669964e625f2913d29f233',
        title: 'La La Land',
        posterURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8N-IhEduegAFWJkjA0nydmlPt0jITYf6K-zQyTCqM6ikE626T',
        rating: '🍟9/10',  
    }
  ]);
  const [current, setCurrent] = useState(0);

  const displayMovies = movies.slice(current, current + 4);

  const prevMovies = () => {
    setCurrent(current => Math.max(current - 4, 0));
  }
  
  const nextMovies = () => {
    setCurrent(current => Math.min(current + 4, movies.length - 4)); 
  }
  const getMovieTitle = (movieId) => {
    return movies.find((movie) => movie.id === movieId).title;
  }
  const handleMovieClick = (movieId) => {
    movies.find((movie) => movie.id === movieId);
    console.log(`Clicked on ${getMovieTitle(movieId)}`);
    navigate.push(`/movie/${movieId}`);
  };
  const handleBannerClick = () => {
    console.log('Banner clicked');
  };
  return (
    <div className='home'>
      <h1 className='title'>Fresh Potatoes</h1>
      <Header />
      <div className='movie-banner-container'>
        <MovieBanner
        movie={topmovie}
        onClick={handleBannerClick}
        />
      </div>

      <div className='movie-cards-container'>
      <button onClick={prevMovies}>←</button>
        {displayMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie.id)}
          />
        ))}
        <button onClick={nextMovies}>→</button>
      </div>
    </div>
  );
}

export default Home;
