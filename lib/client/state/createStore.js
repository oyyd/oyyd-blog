'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

var _reducer = require('./post/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStore(initialState, url) {
  var reducers = (0, _redux.combineReducers)({
    routing: _reactRouterRedux.routeReducer,
    post: _reducer2.default
  });

  var history = typeof url !== 'string' ? _reactRouter.browserHistory : (0, _reactRouter.createMemoryHistory)(url);
  var reduxRouterMiddleware = (0, _reactRouterRedux.syncHistory)(history);
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(reduxRouterMiddleware)(_redux.createStore);

  return createStoreWithMiddleware(reducers, initialState);
}

// reducers