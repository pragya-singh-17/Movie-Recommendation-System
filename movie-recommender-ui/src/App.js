import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movieInput, setMovieInput] = useState('');
  const [searchedMovie, setSearchedMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async (e) => {
    // This allows submitting with the Enter key
    if (e) e.preventDefault(); 

    if (!movieInput) {
      setError('Please enter a movie title.');
      return;
    }
    setLoading(true);
    setError('');
    setRecommendations([]);
    setSearchedMovie('');

    try {
      // Make a request to our Node.js server
      // We use encodeURIComponent to handle titles with special characters
      const res = await axios.get(`http://localhost:8080/api/recommend/${encodeURIComponent(movieInput)}`);
      
      // The API now returns an object with recommendations and the searched movie title
      setRecommendations(res.data.recommendations || []);
      setSearchedMovie(res.data.searched_movie || movieInput);

    } catch (err) {
      // Display the specific error message from the API
      setError(err.response?.data?.error || 'Failed to fetch recommendations. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Recommender</h1>
        {/* Use a form for better accessibility and Enter key submission */}
        <form className="input-group" onSubmit={getRecommendations}>
          <input
            type="text"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
            placeholder="Enter a movie title (e.g., Avatar)"
          />
          <button type="submit" onClick={() => getRecommendations()} disabled={loading}>
            {loading ? 'Getting...' : 'Get Recommendations'}
          </button>
        </form>
        
        {/* Show loading indicator */}
        {loading && <p>Searching for recommendations...</p>}

        {/* Show a clear error message if one exists */}
        {error && !loading && <p className="error">{error}</p>}

        {/* Show results only if there are recommendations */}
        {recommendations.length > 0 && !loading && (
          <div className="results">
            <h2>Recommendations for "{searchedMovie}":</h2>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
