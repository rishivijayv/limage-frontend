import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider, ThemeOptions } from '@material-ui/core/styles';
import './index.css'

const defaultTheme = createMuiTheme();

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: any
  }
  interface ThemeOptions {
    custom?: any
  }
}

function createCustomTheme(options: ThemeOptions) {
  return createMuiTheme({
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
    ...options
  })
}

const theme = createCustomTheme({
  custom: {
    backdrop: {
      zIndex: defaultTheme.zIndex.drawer + 1,
      color: defaultTheme.palette.common.white,
    },
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
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
