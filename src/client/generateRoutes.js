import React from 'react';
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import SimpleList from './components/SimpleList';
import About from './pages/About/index.js';
import { Router, Route, IndexRoute } from 'react-router';

export function generateRoutes() {
  return (
    <Route path="/" component={SimpleApp}>
      <IndexRoute component={SimpleList} />
      <Route path="post/:id" component={SimplePost} />
      <Route path="/about" component={About} />
    </Route>
  );
}

export function generateRouter(history) {
  const routes = generateRoutes();

  return (
    <Router history={history} children={routes} />
  );
}

export default generateRoutes;
