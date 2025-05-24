import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchDataFromAPI, fetchDataFromAPI2, fetchDataFromAPI3, fetchDataFromAPI4, fetchBeStatus, fetchMessage} from './services/apiService';

function App() {
  const [userId, setUserId] = useState(''); // State to hold the user ID
  const [host, setHost] = useState(''); // State to hold the user ID
  const [message, setMessage] = useState(''); // State to hold the user ID
  const [data, setData] = useState({ categories: [], subcategories: {} }); // State to hold the API data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  // const [logs, setLogs] = useState([]); // State to hold log messages
  const [beStatus, setBeStatus] = useState(null);

  // Custom logging function
  // const console.log = (message) => {
  //   setLogs(prevLogs => [...prevLogs, `${new Date().toISOString()}: ${message}`]);
  //   // Also log to browser console
  //   console.log(message);
  // };

  const handleFetchData = () => {
    setError(null);
    setData({ categories: [], subcategories: {} });
    console.log(`Fetching data for user: ${userId}`);
    setLoading(true);
    fetchDataFromAPI(userId, console.log)
        .then(responseData => {
          console.log(`Data received successfully`);
          setData(responseData); // Set both categories and subcategories map
          setLoading(false);
        })
        .catch(error => {
          console.log(`Error: ${error.message}`);
          setError(error);
          setLoading(false);
        });

    fetchDataFromAPI3(console.log)
        .then(responseData => {
          console.log(`3 Data received successfully`);
        })
        .catch(error => {
          console.log(`3 Error: ${error.message}`);
        });

    fetchDataFromAPI4(console.log)
        .then(responseData => {
          console.log(`4 Data received successfully`);
        })
        .catch(error => {
          console.log(`4 Error: ${error.message}`);
        });
  };

  const handleFetchData2 = () => {
    setError(null);
    setData({ categories: [], subcategories: {} });
    console.log(`Fetching data for user: ${userId}, host: ${host}`);
    setLoading(true);
    fetchDataFromAPI2(host, userId, console.log).then(userId, console.log)
        .then(responseData => {
          console.log(`Data received successfully`);
          setData(responseData); // Set both categories and subcategories map
          setLoading(false);
        })
        .catch(error => {
          console.log(`Error: ${error.message}`);
          setError(error);
          setLoading(false);
        });
  };

  const handleFetchBeStatus = () => {
    setBeStatus(null);
    setLoading(true);
    fetchBeStatus(console.log)
        .then(responseData => {
          console.log(`BE status received successfully`);
          setBeStatus(responseData);
          setLoading(false);
        })
        .catch(error => {
          console.log(`BE status error: ${error.message}`);
          setError(error);
          setLoading(false);
        });
  };

  const handleFetchMessage = () => {
    console.log(`Fetching message: ${userId}`);
    setLoading(true);
    fetchMessage(userId, console.log)
        .then(responseData => {
          console.log(`Data received successfully ${responseData}`);
            setMessage(responseData); // Set both categories and subcategories map
          setLoading(false);
        })
        .catch(error => {
          console.log(`Error: ${error.message}`);
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

        <h3>BE status</h3>
        <p>
          <button onClick={handleFetchBeStatus}>Refresh</button>
        </p>
        <p>
          {beStatus ? JSON.stringify(beStatus) : 'No BE status'}
        </p>


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
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="Enter host"
          />
          <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
          />
          <button onClick={handleFetchData}>Fetch Cat</button>
          <button onClick={handleFetchData2}>Fetch Cat 2</button>
          <button onClick={handleFetchMessage}>Message</button>
        </div>

        {loading && <p>Loading data...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {message && <p>BE message: {message}</p>}

        {data && data.categories && data.categories.length > 0 && (
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

        {/* Log display area */}
        {/*<div className="console-output">
          <h3>Console Output:</h3>
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'monospace',
            maxHeight: '200px',
            overflowY: 'auto',
            textAlign: 'left',
            color: '#333'
          }}>
            {logs.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
          </div>
        </div>*/}
      </header>
    </div>
  );
}

export default App;