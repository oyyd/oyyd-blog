'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _generateRoutes = require('./generateRoutes');

var _generateRoutes2 = _interopRequireDefault(_generateRoutes);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('material-design-lite');

function createApp() {
  var store = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (store === null) {
    throw new Error('no valid store provided to "createApp"');
  }

  var routes = (0, _generateRoutes2.default)(_reactRouter.browserHistory);

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    routes
  );
}

exports.default = createApp;