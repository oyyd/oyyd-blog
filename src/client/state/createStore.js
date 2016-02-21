'use strict';

import { createStore as _createStore,
  combineReducers, applyMiddleware, } from 'redux';
import { routeReducer, syncHistory, } from 'react-router-redux';
import { createMemoryHistory, browserHistory, } from 'react-router';

// reducers
import post from './post/reducer';

export default function createStore(initialState, url) {
  const reducers = combineReducers({
    routing: routeReducer,
    post,
  });

  const history = (typeof url !== 'string') ? browserHistory : createMemoryHistory(url);
  const reduxRouterMiddleware = syncHistory(history);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(_createStore);

  return createStoreWithMiddleware(reducers, initialState);
};
