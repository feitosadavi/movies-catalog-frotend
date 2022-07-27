import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from 'pages/Main';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Roboto;
  }
`


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Main />
  </React.StrictMode>
);

reportWebVitals();
