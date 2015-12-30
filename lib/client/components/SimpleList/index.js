'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _posts = require('../../posts.data');

var _posts2 = _interopRequireDefault(_posts);

var _Disqus = require('../Disqus');

var _Disqus2 = _interopRequireDefault(_Disqus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleList = _react2.default.createClass({
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'blog-simple-list' },
      _react2.default.createElement(
        'h2',
        null,
        '文章列表'
      ),
      _posts2.default.map(function (item, index) {
        return _react2.default.createElement(
          'h3',
          { className: 'post-item', key: item.title + item.publicDate },
          _react2.default.createElement(
            'span',
            { className: 'public-date' },
            item.publicDate
          ),
          _react2.default.createElement(
            'a',
            { href: '/post/' + item.fileName },
            item.title
          )
        );
      }),
      _react2.default.createElement(_Disqus2.default, null)
    );
  }
});

exports.default = SimpleList;