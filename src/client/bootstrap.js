import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createApp from './createApp';
import createStore from './state/createStore';
import 'src/client/simple-style.less';

ReactDOM.render(
  createApp(createStore(window.__INITIAL_STATE__), 'client'),
  document.getElementById('main')
);
