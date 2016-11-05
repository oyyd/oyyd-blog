import 'material-design-lite';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { generateRouter, generateRoutes as _generateRoutes } from './generateRoutes';
import createAppStore from './state/createStore';
import './simple-style.less';

function createApp(store = null, router = null) {
  if (store === null) {
    throw new Error('null store');
  }

  if (router === null) {
    throw new Error('null router');
  }

  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}

function createStore(initialState) {
  let store = null;
  let notFirstTime = false;

  if ((module.hot && module.hot.data && module.hot.data.notFirstTime)) {
    store = module.hot.data.store;
    notFirstTime = true;
  }

  if (!store) {
    store = createAppStore(initialState, null, notFirstTime);
  }

  return store;
}

function generateRoutes() {
  let routes = {};

  if ((module.hot && module.hot.data && module.hot.data.notFirstTime)) {
    routes = module.hot.data.routes;
  }

  routes = Object.assign(routes, _generateRoutes());

  return routes;
}

export default function renderApp() {
  // NOTE: hack跳过一致性判断
  const routes = generateRoutes();
  const store = createStore(window.__INITIAL_STATE__);

  // if (module.hot && module.hot.data && module.hot.data.notFirstTime) {
  //   // eslint-disable-next-line
  //   routes = module.hot.data.routes;
  // } else {
  //   routes = generateRouter(browserHistory);
  // }

  const router = (
    <Router history={browserHistory} routes={routes}></Router>
  );


  if (module.hot) {
    module.hot.dispose((data) => {
      data.store = store;
      data.routes = routes;
    });
  }

  ReactDOM.render(
    createApp(store, router), // eslint-disable-line
    document.getElementById('main')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept();

  module.hot.dispose((data) => {
    data.notFirstTime = true;
  });
}
