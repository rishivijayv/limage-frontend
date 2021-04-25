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
    search: {
      position: 'relative',
      borderRadius: defaultTheme.shape.borderRadius,
      backgroundColor: fade(defaultTheme.palette.common.white, 0.25),
      '&:hover': {
        backgroundColor: fade(defaultTheme.palette.common.white, 0.35),
      },
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      padding: defaultTheme.spacing(0, 2),
      marginRight: '20px',
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: defaultTheme.palette.common.white
    },
    inputRoot: {
      color: defaultTheme.palette.common.white
    },
    inputInput: {
      padding: defaultTheme.spacing(1, 1, 1, 2),
      transition: defaultTheme.transitions.create('width'),
      width: '100%',
      [defaultTheme.breakpoints.up('sm')]: {
        width: '40ch',
        '&:focus': {
          width: '50ch',
        },
      },
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
