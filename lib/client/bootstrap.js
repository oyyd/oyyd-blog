'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createApp = require('./createApp');

var _createApp2 = _interopRequireDefault(_createApp);

var _createStore = require('./state/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render((0, _createApp2.default)((0, _createStore2.default)(window.__INITIAL_STATE__), 'client'), // eslint-disable-line
document.getElementById('main'));