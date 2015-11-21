'use strict';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {syncReduxAndRouter} from 'redux-simple-router';
import generateRoutes from './generateRoutes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

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
  const routes = generateRoutes(history);
  syncReduxAndRouter(history, store);

  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
}

export default createApp;
