import './index.css';

import Amplify from 'aws-amplify'; // <--- 追加
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import config from './aws-exports'; // <--- 追加
import * as serviceWorker from './serviceWorker';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
