import React, { useState } from 'react';
import Header from './Header';

const ReviewBox = ({ title, username, review, rating, comments, addComment }) => {
  const [commentInput, setCommentInput] = useState('');

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmitComment = () => {
    if (commentInput.trim() !== '') {
      addComment(commentInput);
      setCommentInput('');
    }
  };

  const getEmoji = (rating) => {
    return rating >= 5 ? '🍟' : '🥔';
  };

  const displayRating = (rating) => {
    const emoji = getEmoji(rating);
    return `${emoji}${rating}/10`;
  };

  return (
    <div style={{ padding: '10px', margin: '10px', maxWidth: '300px' }}>
      <h3>{title}</h3>
      <p>Username: {username}</p>
      <p>Review: {review}</p>
      <p>Rating: {displayRating(rating)}</p>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Add your comment"
          value={commentInput}
          onChange={handleCommentChange}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSubmitComment}>Submit</button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <h4>Comments:</h4>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

const MoviePage = () => {
  const [friendsReviews, setFriendsReviews] = useState([
    {
      title: 'Transformers',
      username: 'Bumblebee',
      review: 'This movie was amazing!',
      rating: 8.5,
      comments: [],
    },
    {
      title: 'Transformers',
      username: 'Optimus Prime',
      review: 'I loved it!',
      rating: 6.7,
      comments: [],
    },
    // Add more friends' reviews as needed
  ]);

  const [otherReviews, setOtherReviews] = useState([
    {
      title: 'Transformers',
      username: 'avgstudent1',
      review: 'It was okay.',
      rating: 4.2,
      comments: [],
    },
    {
      title: 'Transformers',
      username: 'avgstudent2',
      review: 'Disappointing.',
      rating: 3.8,
      comments: [],
    },
    // Add more reviews from other users as needed
  ]);

  const addCommentToReview = (reviewType, index, comment) => {
    if (reviewType === 'friends') {
      const updatedFriendsReviews = [...friendsReviews];
      updatedFriendsReviews[index].comments.push(comment);
      setFriendsReviews(updatedFriendsReviews);
    } else if (reviewType === 'other') {
      const updatedOtherReviews = [...otherReviews];
      updatedOtherReviews[index].comments.push(comment);
      setOtherReviews(updatedOtherReviews);
    }
  };

  return (
    <div className='home'>
      <h1 className='title'>Fresh Potatoes</h1>
      <Header />
      <div style={{ display: 'flex' }}>
        {/* Friends' Reviews */}
        <div style={{ marginRight: '20px' }}>
          <h3>Friends' Reviews</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {friendsReviews.map((review, index) => (
              <ReviewBox
                key={`friend-review-${index}`}
                title={review.title}
                username={review.username}
                review={review.review}
                rating={review.rating}
                comments={review.comments}
                addComment={(comment) => addCommentToReview('friends', index, comment)}
              />
            ))}
          </div>
        </div>
        {/* Other People's Reviews */}
        <div>
          <h3>Reviews</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {otherReviews.map((review, index) => (
              <ReviewBox
                key={`other-review-${index}`}
                title={review.title}
                username={review.username}
                review={review.review}
                rating={review.rating}
                comments={review.comments}
                addComment={(comment) => addCommentToReview('other', index, comment)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;