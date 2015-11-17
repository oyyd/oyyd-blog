import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import generateRoutes from './generateRoutes';
import 'src/client/simple-style.less';

ReactDOM.render(
  generateRoutes(),
  document.getElementById('main')
);
