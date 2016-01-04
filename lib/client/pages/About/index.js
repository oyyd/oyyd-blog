'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleApp = require('../../components/SimpleApp');

var _SimpleApp2 = _interopRequireDefault(_SimpleApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = (function (_React$Component) {
  _inherits(About, _React$Component);

  function About(props) {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).call(this, props));
  }

  _createClass(About, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _SimpleApp2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'region' },
          _react2.default.createElement(
            'h2',
            null,
            'About me'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Hi，我叫欧阳亚东。我每天都会写不少代码，并思考其中的事情。你可能有兴趣了解得更多一点：'
          ),
          _react2.default.createElement(
            'ul',
            { style: { listStyle: 'inherit' } },
            _react2.default.createElement(
              'li',
              null,
              '我花了一年多的时间学习日语，考了',
              _react2.default.createElement(
                'a',
                { href: 'https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%83%BD%E5%8A%9B%E8%A9%A6%E9%A8%93', target: '_blank' },
                'JLPT N1'
              ),
              '的证书。'
            ),
            _react2.default.createElement(
              'li',
              null,
              '高中时参加了NOIP，开始编程，获得了一等奖，并从中体会到了别样的乐趣。'
            ),
            _react2.default.createElement(
              'li',
              null,
              '可以讲闽南语。'
            ),
            _react2.default.createElement(
              'li',
              null,
              '听很多vocaloid相关的音乐（',
              _react2.default.createElement(
                'a',
                { href: 'https://www.youtube.com/user/gridm7', target: '_blank' },
                'ATOLS'
              ),
              '）。'
            ),
            _react2.default.createElement(
              'li',
              null,
              '不常使用社交软件。'
            ),
            _react2.default.createElement(
              'li',
              null,
              '偶尔上pixiv。'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'region' },
          _react2.default.createElement(
            'h2',
            null,
            'Contact'
          ),
          _react2.default.createElement(
            'p',
            null,
            '不要担心，给我发邮件吧：',
            _react2.default.createElement(
              'a',
              { href: 'mailto://oyydoibh@gmail.com' },
              'oyydoibh@gmail.com'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'region' },
          _react2.default.createElement(
            'h2',
            null,
            'Works'
          ),
          _react2.default.createElement(
            'div',
            { className: 'content', style: { paddingLeft: 10 } },
            _react2.default.createElement(
              'h3',
              null,
              '翻译 -',
              _react2.default.createElement(
                'a',
                { href: 'https://www.gitbook.com/book/oyyd/typescript-handbook-zh/details',
                  target: '_blank' },
                'Typescript Handbook'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                { style: { marginTop: 30 } },
                'D3 Gallery - ',
                _react2.default.createElement(
                  'a',
                  { href: 'http://bl.ocks.org/oyyd/859fafc8122977a3afd6', target: '_blank' },
                  'Days-Hours Heatmap'
                )
              ),
              _react2.default.createElement('img', { style: { marginTop: 20 }, src: 'https://camo.githubusercontent.com/3bd164ff8c1d4b3b934b624016211f8ae6487422/687474703a2f2f626c2e6f636b732e6f72672f6f7979642f7261772f38353966616663383132323937376133616664362f7468756d626e61696c2e706e67' })
            )
          )
        )
      );
    }
  }]);

  return About;
})(_react2.default.Component);

About.title = 'oyyd-blog - 关于我';

exports.default = About;