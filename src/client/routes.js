import React from 'react';
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import SimpleList from './components/SimpleList';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route path="/" handler={SimpleApp}>
    <DefaultRoute handler={SimpleList}/>
    <Route path="post/:id" handler={SimplePost}></Route>
  </Route>
);
