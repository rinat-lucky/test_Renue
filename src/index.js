import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import App from "./components/App";
import store from './slices/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
