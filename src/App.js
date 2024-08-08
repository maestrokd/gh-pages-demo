import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [userIdQueryParam, setUserIdQueryParam] = useState(null);

  useEffect(() => {
    // Step 1: Get the query string from the URL
    const queryString = window.location.search;
    console.log("here");

    // Step 2: Parse the query string using URLSearchParams
    const urlParams = new URLSearchParams(queryString);
    console.log("urlParams: " + urlParams);
    const userIdFromUrl = urlParams.get('user_id'); // Get the specific 'user_id' parameter
    console.log("userIdFromUrl: " + userIdFromUrl);

    // Step 3: Store the user ID in the component state
    if (userIdFromUrl) {
      setUserIdQueryParam(userIdFromUrl);
      console.log("setUserIdQueryParam: " + userIdFromUrl);
    } else {
      console.error("User ID not found in URL");
    }
  }, []);



  const [userId, setUserId] = useState(null);
  const [telegramOb, setTelegramOb] = useState(null);
  const [initData, setInitData] = useState(null);

  useEffect(() => {
    // Initialize the Telegram Web App SDK
    const telegram = window.Telegram?.WebApp;

    if (telegram) {
      setTelegramOb("yes")
      // Trigger Telegram Web App initialization
      telegram.ready();

      setInitData(telegram.initDataUnsafe);
      // Retrieve user information
      const user = telegram.initDataUnsafe?.user;
      if (user) {
        setUserId(user.id); // Store the user ID in the component state
          window.Telegram.WebApp.showAlert("hello", null);
          window.Telegram.WebApp.sendData("my data");
      } else {
        console.error("User data not available");
      }
    } else {
      setTelegramOb("no")
      console.error("Telegram WebApp is not available");
    }
  }, []);

  return (
      <div className="App">

        <div>
          <p>10:00 Telegram Object: {telegramOb}</p>
        </div>
        <div>
          <p>Telegram init data: {JSON.stringify(initData, null, 2)}</p>
        </div>
        <div>
          <p>Telegram init WebApp: {JSON.stringify(window.Telegram?.WebApp, null, 2)}</p>
        </div>
        <div>
          <p>Telegram init Telegram: {JSON.stringify(window.Telegram, null, 2)}</p>
        </div>

        <div>
          {userId ? (
              <p>Telegram User ID: {userId}</p>
          ) : (
              <p>Loading...</p>
          )}
        </div>

        <div>
          {userIdQueryParam ? (
              <p>User ID from URL: {userIdQueryParam}</p>
          ) : (
              <p>No User ID found in URL</p>
          )}
        </div>


        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>

          <h2>
            GH Pages Demo
          </h2>
          <h2>
            Feature codebase
          </h2>

          <p> 2 Test env var: {process.env.REACT_APP_TEST_VAR} for {process.env.NODE_ENV} env.</p>

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
        </header>


      </div>
  );
}

export default App;
