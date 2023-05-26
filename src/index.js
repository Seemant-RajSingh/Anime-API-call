import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './globalstyle'
import { GlobalContextProvider } from './context/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Applying styles */}
    <GlobalStyle />
    <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
  </React.StrictMode>
);



//npm i react-router-dom styled-components USED