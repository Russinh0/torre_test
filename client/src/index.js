import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from 'react-router-dom'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main:'#cddc39'
    }
  },
  typography:{
    allVariants:{
      color:'#cddc39'
    }
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline  />
      <Router>
    <App />
      </Router>
    </ThemeProvider>
  </>
);
