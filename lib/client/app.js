'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getHistory(env) {
  if (props.env === 'server') {
    return (0, _createMemoryHistory2.default)();
  }

  return (0, _createBrowserHistory2.default)();
}

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    if (props.store === null) {
      throw new Error('no valid store provided to "App"');
    }

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    var history = getHistory(props.env);
    (0, _reduxSimpleRouter.syncReduxAndRouter)(history, props.store);

    _this.routes = (0, _generateRoutes2.default)(history);
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.props.store },
        this.routes
      );
    }
  }]);

  return App;
})(_react2.default.Component);

;

App.propTypes = {
  store: _react2.default.PropTypes.object,
  env: _react2.default.PropTypes.string
};

App.defaultProps = {
  store: null,
  env: 'dev'
};

exports.default = App;