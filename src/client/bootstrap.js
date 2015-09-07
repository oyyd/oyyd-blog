import React from 'react';
import Router from 'react-router';
import routes from './routes';
import './simple-style.less';

// bootstrap/main
Router.run(routes, Router.HashLocation, (Root) =>{
  React.render(<Root />, document.getElementById('main'));
});
