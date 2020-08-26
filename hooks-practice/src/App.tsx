import './App.css';

import React from 'react';

import Counter from './components/Counter';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Learn React
        <Counter />
      </header>
    </div>
  );
}

export default App;
