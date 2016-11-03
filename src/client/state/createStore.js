import { createStore as _createStore,
  combineReducers, applyMiddleware } from 'redux';
import { routeReducer, syncHistory } from 'react-router-redux';
import { createMemoryHistory, browserHistory } from 'react-router';

// reducers
import postReducer from './post/reducer';

function createReducer(post) {
  return combineReducers({
    routing: routeReducer,
    post,
  });
}

export default function createStore(initialState, url, shouldPatch) {
  const reducers = createReducer(postReducer);

  const history = (typeof url !== 'string') ? browserHistory : createMemoryHistory(url);
  const reduxRouterMiddleware = syncHistory(history);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(_createStore);

  const store = createStoreWithMiddleware(reducers, initialState);

  if (module.hot && shouldPatch) {
    module.hot.accept('./post/reducer', () => {
      // eslint-disable-next-line
      const postReducer = require('./post/reducer');
      const nextRootReducer = createReducer(postReducer);

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
