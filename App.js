// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import BookPage from './pages/BookPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can keep a common header here if needed */}
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
