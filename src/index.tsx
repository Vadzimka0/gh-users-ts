import React from 'react';

import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

import { GithubProvider } from 'context/context';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-pu8wyk-g.us.auth0.com"
      clientId="GYsVn60CkUU6fa4yiwpRrT1KVL5KuzPh"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
