import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import Home from 'pages/Home';
import Inicio from 'pages/Inicio';
import Login from 'pages/Login';

const componenteAtual = window.location.pathname === '/' ? <Login /> : <Home />;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <body>
      {/* <Home /> */}
      {componenteAtual}
    </body>
  </React.StrictMode>
);
