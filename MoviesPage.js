// src/pages/MoviesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/MovieBookingWebApp/api/movies');
        setMovies(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false); // Always stop loading
      }
    };
    
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Available Movies</h2>

      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies available right now.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Available Tickets: {movie.availableTickets}</p>
              <Link to={`/book/${movie.id}`}>Book Tickets</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;
