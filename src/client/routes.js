const React = require('react');
const App = require('./components/App/App.js');
const PostViewer = require('./components/PostViewer/PostViewer.js');
const PostsList = require('./components/PostsList/PostsList.js');
const ErrorPage = require('./components/ErrorPage/ErrorPage.js');
const Router = require('react-router');
const PostUploader = require('./components/PostUploader/PostUploader.js');
const {Route, DefaultRoute, NotFoundRoute} = Router;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={PostsList}/>
    <NotFoundRoute handler={ErrorPage}/>
    <Route path="post/">
      <DefaultRoute name="PostsList" handler={PostsList}/>
      <Route path="upload/">
        <DefaultRoute name="PostUploader" handler={PostUploader}/>
        <Route path=":id/" handler={PostUploader}></Route>
      </Route>
      <Route path="wordpress/">
        <DefaultRoute name="PostsList.Wordpress" handler={PostsList.Wordpress}/>
        <Route path=":id/">
          <DefaultRoute handler={PostViewer.Wordpress}/>
        </Route>
      </Route>
      <Route path=":id" handler={PostViewer}></Route>
    </Route>
  </Route>
);

module.exports = routes;