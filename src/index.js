import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { fade, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  overrides: {
    MuiBreadcrumbs: {
      separator: {
        fontSize: '25px',
        color: defaultTheme.palette.common.black
      }
    }
  },
  typography: {
    fontFamily: "'Raleway', sans-serif"
  },
  custom: {
    centerContainer: {
      textAlign: 'center'
    },
    button: {
      color: defaultTheme.palette.common.white,
      backgroundColor: defaultTheme.palette.common.black,
      fontWeight: 'bold',
      '&:hover': {
          backgroundColor: defaultTheme.palette.common.black
      },
      marginRight: '10px'
    },
    success: {
      color: '#00b359'
    },
    error: {
      color: defaultTheme.palette.error.main
    },
    basicLink: {
      textDecoration: 'none',
      fontWeight: '900',
      fontSize: '22px'
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
