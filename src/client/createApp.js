'use strict';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {syncReduxAndRouter} from 'redux-simple-router';
import generateRoutes from './generateRoutes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

// routes
import SimpleApp from './components/SimpleApp';
import SimplePost from './components/SimplePost';
import SimpleList from './components/SimpleList';
import About from './pages/About/index.js';
import {Router, Route, Link, IndexRoute} from 'react-router';

function getHistory(env) {
  if (env === 'server') {
    return createMemoryHistory();
  }

  return createBrowserHistory();
}

function createApp(store = null, env = 'client') {
  if (store === null) {
    throw new Error('no valid store provided to "createApp"');
  }

  const history = getHistory(env);
  syncReduxAndRouter(history, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={SimpleApp}>
          <IndexRoute component={SimpleList}/>
          <Route path='post/:id' component={SimplePost}></Route>
        </Route>
        <Route path='/about' component={About}></Route>
      </Router>
    </Provider>
  );
}

export default createApp;
