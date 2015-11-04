import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes';
import './simple-style.less';

ReactDOM.render(
  routes,
  document.getElementById('main')
);
