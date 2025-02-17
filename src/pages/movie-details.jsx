import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Movie-details.css';
//import dotenv from 'dotenv';
//dotenv.config({path:"./.env"});

//const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your API key
const API_KEY = '6f37c006'; 
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Error fetching movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="not-found">Movie not found.</div>;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <h1 className="movie-detail-title">{movie.Title}</h1>
        {movie.Poster && <img src={movie.Poster} alt={movie.Title} className="movie-detail-image" />}
        <div className="movie-detail-info">
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Year:</strong> {movie.Year}</p> 
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="movie-detail-back-button">
        Back
      </button>
    </div>
  );
};

export default MovieDetails;