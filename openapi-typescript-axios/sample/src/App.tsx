import './App.css';

import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import { DefaultApiFactory } from './book-api-client/api';
import logo from './logo.svg';

const App: React.FC = () => {
  useEffect(() => {
    DefaultApiFactory().getBooks().then((res: AxiosResponse) => {
      console.log(res);
    });

  }, [])
  return (
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
      </header>
    </div>
  );
}

export default App;
