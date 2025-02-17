import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home-page.jsx";
import MovieDetails from "./pages/movie-details.jsx";
import './App.css'; // Import your global CSS

function App() {
  return (
    <Router>
      <div className="app-container">  {/* The container div */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
