'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createStore = require('../../client/state/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _generateRoutes = require('../../client/generateRoutes');

var _generateRoutes2 = _interopRequireDefault(_generateRoutes);

var _reactRouter = require('react-router');

var _escapeJSONString = require('../utils/escapeJSONString');

var _escapeJSONString2 = _interopRequireDefault(_escapeJSONString);

var _createPage = require('../../template/createPage');

var _createPage2 = _interopRequireDefault(_createPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _generateRoutes2.default)(null);
function renderPages(req, res) {
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send((0, _createPage2.default)({
        content: (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RoutingContext, renderProps)),
        initialState: (0, _escapeJSONString2.default)(JSON.stringify((0, _createStore2.default)()))
      }));
    } else {
      res.status(404).send('Not found');
    }
  });
}

exports.default = renderPages;