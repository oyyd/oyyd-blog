import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes';
import './simple-style.less';

// bootstrap/main
// Router.run(routes, Router.HashLocation, (Root) =>{
//   ReactDOM.render(<Root />, document.getElementById('main'));
// });

ReactDOM.render(
  routes,
  document.getElementById('main')
);
