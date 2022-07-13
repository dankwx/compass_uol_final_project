import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import Home from 'pages/Home';
import Inicio from 'pages/Inicio';
import Login from 'pages/Login';
import Router from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <body>
      <Router />
    </body>
  </React.StrictMode>
);
