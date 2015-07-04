const React = require('react');
const Router = require('react-router');
const routes = require('./routes');

console.log('yes');

Router.run(routes, Router.HashLocation, (Root) =>{
  React.render(<Root />, document.getElementById('main'));
});