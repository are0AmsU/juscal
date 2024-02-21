import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'
import { GlobalContextProvider } from './ui/contexts/GlobalContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
