import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
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
