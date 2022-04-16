import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CONSTANTS from './constant';
import './index.css';
import appStore from './redux/store';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: `${CONSTANTS.DATABASE_URL}/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={appStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals();
