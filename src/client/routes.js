import React from 'react';
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

let routes = (
  <Route path="/" handler={SimpleApp}>
    <Route path="test/:id" handler={SimplePost}></Route>
  </Route>
);

export default routes;
