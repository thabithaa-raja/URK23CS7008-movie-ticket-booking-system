// src/pages/BookPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BookPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // NEW
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/MovieBookingWebApp/api/movies/${id}`);
        setMovie(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to fetch movie details. Please try again.');
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchMovie();
  }, [id]);

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:8080/MovieBookingWebApp/api/book', {
        movieId: movie.id,
        count: ticketCount
      });

      if (response.data.booked) {
        navigate('/success');
      } else {
        setError('Not enough available tickets.');
      }
    } catch (err) {
      console.error('Error booking tickets:', err);
      setError('An error occurred during booking. Please try again.');
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading movie details...</p> // Loading state
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Error state
      ) : (
        <>
          <h2>Book Tickets for {movie.title}</h2>
          <p>Available Tickets: {movie.availableTickets}</p>
          <input
            type="number"
            value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}
            min="1"
            max={movie.availableTickets}
          />
          <button onClick={handleBooking}>Book Tickets</button>
        </>
      )}
    </div>
  );
}

export default BookPage;
