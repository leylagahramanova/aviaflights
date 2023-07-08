import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css";
import axios from "axios";
import './App.css';

import { Provider } from 'react-redux';
import {store} from './app/store';
axios.defaults.withCredentials=true;
const container=document.getElementById('root');
const root=createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
