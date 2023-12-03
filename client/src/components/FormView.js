import React, { useState } from 'react';
import './CommonStyling.css';


const FormView = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [rating, setRating] = useState('');

  const handleRatingChange = (newRating) => {
    const numericRating = parseFloat(newRating);
    let emoji = '🍟'; // Default emoji for higher ratings

    if (!isNaN(numericRating)) {
      if (numericRating < 5.0) {
        emoji = '🥔'; // Change emoji to a potato for lower ratings
      }
      setRating(`${emoji}${numericRating.toFixed(1)}/10.0`);
    } else {
      // Handle invalid input
      setRating('');
      alert('Please enter a valid rating!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if title, img, and rating have values before adding a new movie
    if (title && img && rating) {
      onAdd({ title, img, rating }); // Pass rating along with other movie details
      setTitle('');
      setImg('');
      setRating('');
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
      </label>
      <label>
        Rating:
        <input
          type="text"
          value={rating}
          onChange={(e) => handleRatingChange(e.target.value)}
        />
      </label>
      <button className='formviewButton' type="submit"><h1 className='addReview'>＋</h1></button>
      <button className='formviewButton' type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default FormView;
