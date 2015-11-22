'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxSimpleRouter = require('redux-simple-router');

var _generateRoutes = require('./generateRoutes');

var _generateRoutes2 = _interopRequireDefault(_generateRoutes);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/lib/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHistory(env) {
  if (env === 'server') {
    return (0, _createMemoryHistory2.default)();
  }

  return (0, _createBrowserHistory2.default)();
}

function createApp() {
  var store = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var env = arguments.length <= 1 || arguments[1] === undefined ? 'client' : arguments[1];

  if (store === null) {
    throw new Error('no valid store provided to "createApp"');
  }

  var history = getHistory(env);
  var routes = (0, _generateRoutes2.default)(history);
  (0, _reduxSimpleRouter.syncReduxAndRouter)(history, store);

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    routes
  );
}

exports.default = createApp;