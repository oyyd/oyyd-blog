'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleApp = _react2.default.createClass({
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oyyd-blog' },
      this.renderHeader(),
      _react2.default.createElement(
        'div',
        { className: 'content' },
        this.props.children
      ),
      this.renderFooter()
    );
  },
  renderHeader: function renderHeader() {
    return _react2.default.createElement(
      'div',
      { className: 'header' },
      _react2.default.createElement(
        'h1',
        null,
        _react2.default.createElement(
          'a',
          { href: '/', className: 'site-name', title: '返回列表' },
          '亚东博客'
        ),
        _react2.default.createElement(
          'a',
          { className: 'header-icon github-link', href: 'https://github.com/oyyd', title: 'github' },
          _react2.default.createElement('span', { className: 'icon-github' })
        ),
        _react2.default.createElement(
          'a',
          { className: 'header-icon rss-feed', href: '/dist/feed.xml', title: 'rss feed' },
          _react2.default.createElement('span', { className: 'icon-feed4' })
        ),
        _react2.default.createElement(
          'a',
          { className: 'header-icon', href: '/about', title: 'about me', style: {
              marginLeft: '5%',
              verticalAlign: 'middle',
              borderBottom: 'none'
            } },
          _react2.default.createElement(
            'span',
            { className: 'alike-icon', style: {
                fontSize: 18,
                display: 'inline-block'
              } },
            'About'
          )
        )
      )
    );
  },
  renderFooter: function renderFooter() {
    return _react2.default.createElement(
      'div',
      { className: 'footer' },
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          'span',
          null,
          'Built by '
        ),
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/oyyd/oyyd-blog' },
          'oyyd-blog'
        ),
        _react2.default.createElement(
          'span',
          null,
          ' and styled by modified '
        ),
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/daveliepmann/tufte-css' },
          'tufte-css'
        ),
        _react2.default.createElement(
          'span',
          null,
          '.'
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'cert' },
        '京ICP备14040206号-1'
      )
    );
  }
});

exports.default = SimpleApp;