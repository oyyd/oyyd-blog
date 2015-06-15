const React = require('react');
const Router = require('react-router');
const routes = require('./routes');

Router.run(routes, Router.HashLocation, (Root) =>{
  React.render(<Root />, document.getElementById('main'));
});