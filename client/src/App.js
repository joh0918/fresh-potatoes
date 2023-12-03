import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MyReviews from './components/MyReviews';
import MoviePage from './components/MoviePage'; // Import your MoviePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/movie/:id" element={<MoviePage />} /> {/* New route for MoviePage */}
      </Routes>
    </Router>
  );
}

export default App;
