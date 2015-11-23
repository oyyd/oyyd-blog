'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleApp = require('./components/SimpleApp');

var _SimpleApp2 = _interopRequireDefault(_SimpleApp);

var _SimplePost = require('./components/SimplePost');

var _SimplePost2 = _interopRequireDefault(_SimplePost);

var _SimpleList = require('./components/SimpleList');

var _SimpleList2 = _interopRequireDefault(_SimpleList);

var _index = require('./pages/About/index.js');

var _index2 = _interopRequireDefault(_index);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Router,
  null,
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _SimpleApp2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _SimpleList2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'post/:id', component: _SimplePost2.default })
  ),
  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _index2.default })
);

exports.default = routes;