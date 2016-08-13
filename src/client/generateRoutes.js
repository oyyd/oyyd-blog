import React from 'react';
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import SimpleList from './components/SimpleList';
import About from './pages/About/index.js';
import { Router, Route, IndexRoute } from 'react-router';

function generateRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={SimpleApp}>
        <IndexRoute component={SimpleList} />
        <Route path="post/:id" component={SimplePost} />
      </Route>
      <Route path="/about" component={About} />
    </Router>
  );
}

export default generateRoutes;
