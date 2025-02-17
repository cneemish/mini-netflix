import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import dotenv from 'dotenv';
//dotenv.config({path:"./.env"});

//const API_KEY = process.env.REACT_APP_API_KEY;  //  API key
const API_KEY = '6f37c006'; 
const initialMovieTitles = ['batman', 'Avengers age of ultron' , 'The Dark Knight', 'The Dark Knight Rises', 'The Avengers', 'The Shawshank Redemption', 'The Godfather', 'The Godfather Part II', 'The Dark Knight'];

const Home = () => {
  const [movies, setMovies] = useState([]); //Initialize with an empty array

  useEffect(() => {
    const fetchInitialMovies = async () => {
      const moviePromises = initialMovieTitles.map(async (title) => {
        try {
          const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}&plot=full`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching movie ${title}:`, error);
          return null;
        }
      });

      const movieData = await Promise.all(moviePromises);
      setMovies(movieData.filter((movie) => movie !== null)); //  Filter out null values
    };

    fetchInitialMovies();
  }, []);

  return (
    <div className="home-container">
      <h1>Mini Netflix</h1>

      <div className="movie-grid">
        {movies.length > 0 ? ( 
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
              </Link>
            </div>
          ))
        ) : (
          <p>Loading movies...</p> //  Show loading message until data is fetched
        )}
      </div>
    </div>
  );
};

export default Home;
