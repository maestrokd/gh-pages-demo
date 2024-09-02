import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchDataFromAPI } from './services/apiService';

function App() {
  const [userId, setUserId] = useState(''); // State to hold the user ID
  const [data, setData] = useState({ categories: [], subcategories: {} }); // State to hold the API data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  const handleFetchData = () => {
    setLoading(true);
    fetchDataFromAPI(userId)
        .then(responseData => {
          setData(responseData); // Set both categories and subcategories map
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>

        <h2>
          GH Pages Demo
        </h2>
        <h2>
          dev codebase
        </h2>

        <p> 2 Test env var: {process.env.REACT_APP_TEST_VAR} for {process.env.NODE_ENV} env.</p>
        <p> 3 env var 2: {process.env.REACT_APP_BE_REST_HOST}</p>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
          />
          <button onClick={handleFetchData}>Fetch Categories and Subcategories</button>
        </div>

        {loading && <p>Loading data...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data.categories.length > 0 && (
            <div>
              <h3>Categories:</h3>
              <ul>
                {data.categories.map((category, index) => (
                    <li key={index}>
                      {category}
                      {data.subcategories[category] && (
                          <ul>
                            {data.subcategories[category].map((subcategory, subIndex) => (
                                <li key={subIndex}>{subcategory}</li>
                            ))}
                          </ul>
                      )}
                    </li>
                ))}
              </ul>
            </div>
        )}
      </header>
    </div>
  );
}

export default App;
