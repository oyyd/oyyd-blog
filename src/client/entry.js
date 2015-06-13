const React = require('react');
const PostViewer = require('./PostViewer');
const PostsList = require('./PostsList');
const Router = require('react-router');
const ErrorPage = require('./ErrorPage');
const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = Router;

var App = React.createClass({  
  render: function() {
    return (
      <div>
        <h1>OYYD-blog</h1>
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={PostsList}/>
    <NotFoundRoute handler={ErrorPage}/>
    <Route path="post_viewer" handler={PostViewer}></Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) =>{
  React.render(<Root />, document.body);
});