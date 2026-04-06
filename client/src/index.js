import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import Contextprovider from "./components/context/Contextprovider";

ReactDOM.render(
  <Contextprovider>
    <Provider store={store}>
        <App />
    </Provider>
  </Contextprovider>,
  document.getElementById('root')
);