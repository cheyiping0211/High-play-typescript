import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import graphqlApi from "./services/graphqlApis";
import * as serviceWorker from './serviceWorker';
import App from './App';
import Store from './store'
import './assets/css/index.css';


const { client } = new graphqlApi();
const app = (
  <ApolloProvider client={client}>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
