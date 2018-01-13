/* eslint-disable import/default */

import React from 'react';
import "babel-polyfill"; //for axios promise: https://github.com/mzabriskie/axios/issues/135, increase 64KB main.js size, after compression is about 16KB
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

// remove tap delay, essential for MaterialUI to work properly (semantic ui?)
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

render(
  <App/> , document.getElementById('app')
);
