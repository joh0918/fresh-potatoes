import { useState } from 'react'; 
import FormView from './FormView';
import Header from './Header';
import './CommonStyling.css';

function MyReviews() {

  const [movies, setMovies] = useState([
    { 
      id: 1,
      img: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg',
      title: 'Toy Story',
      rating: '🍟9.8/10.0'
    },
    { 
      id: 2,
      img: 'https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      title: 'Shrek',
      rating: '🍟8.5/10.0'
    },
    { 
      id: 3, 
      img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1wNJi3WBo8wjZ-lxg4xPbg6-X7tQ1w6ZFI5L-RH1rUiOOGxLO', 
      title: 'Inception', 
      rating: '🍟7.0/10.0'   
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const addMovie = (movie) => {
    const newMovie = {
      id: movies.length + 1, // Generate a unique ID
      ...movie,
    };
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  const deleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(m => m.id !== id));
    setSelectedMovieId(null); // Reset selected movie ID after deletion
  }

  const editRating = (id, newRating) => {
    const numericRating = parseFloat(newRating); // Extract the numerical part of the new rating
    let emoji = '🍟'; // Default emoji for higher ratings
  
    if (!isNaN(numericRating)) {
      if (numericRating < 5.0) {
        emoji = '🥔'; // Change emoji to a potato for lower ratings
      }
      
      setMovies(prevMovies =>
        prevMovies.map(movie =>
          movie.id === id ? { ...movie, rating: `${emoji}${numericRating.toFixed(1)}/10.0` } : movie
        )
      );
    } else {
      // Handle invalid input
      alert('Please enter a valid rating!');
    }
  };
  

  const selectMovie = (id) => {
    setSelectedMovieId(id);
  };

  const cancelSelection = () => {
    setSelectedMovieId(null); // Reset selected movie ID
  };

  return (
    <div className='home'>
      <h1 className='title'>Fresh Potatoes</h1>
      <Header />
      <div className="movie-cards-container">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.img}
              alt={`Poster for ${movie.title}`}
              onClick={() => selectedMovieId === movie.id ? cancelSelection() : selectMovie(movie.id)}
            />
            <h3 onClick={() => selectedMovieId === movie.id ? cancelSelection() : selectMovie(movie.id)}>
              {movie.title}
            </h3>
            <p>{movie.rating}</p>
            {selectedMovieId === movie.id && (
              <div className='buttonReview'>
                <button className = "review" onClick={() => deleteMovie(movie.id)}>🗑️</button>
                <button className = "review" onClick={() => editRating(movie.id, prompt('Enter new rating:'))}>Edit Rating</button>
                <button className = "review" onClick={() => cancelSelection()}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      
        <button  onClick={() => setShowForm(true)}>
          <h1 className='addReview'>＋</h1>
        </button>

  
        {showForm && (
          <FormView onAdd={addMovie} onCancel={() => setShowForm(false)} />
        )}
      </div>
    </div>
  )
}


export default MyReviews;
