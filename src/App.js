import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>

        <h2>
          GH Pages Demo
        </h2>
        <h2>
          main codebase
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
