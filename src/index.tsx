import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider, ThemeOptions } from '@material-ui/core/styles';
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import { createUploadLink } from "apollo-upload-client";
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
    palette: {
      action: {
        disabledBackground: defaultTheme.palette.common.black,
        disabled: defaultTheme.palette.common.white
      }
    },
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

// TODO: For development only. Remove when app is complete
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        locations
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLinkWithHttp = createUploadLink({
  uri: process.env.REACT_APP_SERVER_URL,
  credentials: "include"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, uploadLinkWithHttp])
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
