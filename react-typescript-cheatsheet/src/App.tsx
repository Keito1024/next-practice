import './App.css';

import React from 'react';

import Greeting from './components/Greeting';
import Sample from './components/Sample';
import { ctx, currentUserContext } from './context/User';
import logo from './logo.svg';

function App() {
  return (
    <currentUserContext.Provider value={ctx}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Sample message={"message"} />
          <Greeting />
        </header>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
