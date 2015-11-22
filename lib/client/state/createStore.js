'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _redux = require('redux');

var _reduxSimpleRouter = require('redux-simple-router');

var _reducer = require('./post/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
  routing: _reduxSimpleRouter.routeReducer,
  post: _reducer2.default
});

// reducers

function createStore(initialState) {
  return (0, _redux.createStore)(reducers, initialState);
}