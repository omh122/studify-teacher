import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#514663',
    },
    secondary: {
      main: '#7698B3',
    },
    background: {
      default: '#fffef2',
    },
  },
  typography: {
    fontFamily: ['Bellota Text', 'cursive'].join(','),
    h2: {
      fontWeight: 'bold',
      fontSize: '3.3rem',
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '2.8rem',
      marginBottom: 15,
    },
    h4: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      marginBottom: 3,
      marginTop: 3,
    },
    h5: {
      fontSize: '1.2rem',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
