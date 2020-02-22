import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleMap from './components/SimpleMap.js'

function App() {
  const latitude = 34.350196
  const longitude = -116.248543
  const coords = {latitude, longitude}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learntest
        </a>
      </header>
      <body>
        <SimpleMap location={coords} emergency_location = {coords}/> 

      </body>
    </div>
  );
}

export default App;
