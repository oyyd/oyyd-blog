import React from 'react';
import { Provider } from 'react-redux';
import generateRoutes from './generateRoutes';
import { browserHistory } from 'react-router';

require('material-design-lite');

function createApp(store = null) {
  if (store === null) {
    throw new Error('no valid store provided to "createApp"');
  }

  const routes = generateRoutes(browserHistory);

  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
}

export default createApp;
