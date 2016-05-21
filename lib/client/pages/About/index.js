'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleApp = require('../../components/SimpleApp');

var _SimpleApp2 = _interopRequireDefault(_SimpleApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIST_STYLE = {
  listStyle: 'inherit'
};
var IMG_STYLE = { marginTop: 20 };

var JLPT_WIKI_URL = 'https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%83%BD%E5%8A%9B%E8%A9%A6%E9%A8%93';
var ATOLS_YOUTUBE_URL = 'https://www.youtube.com/user/gridm7';
var D3_GALLERY_SRC = 'https://camo.githubusercontent.com/3bd164ff8c1d4b3b934b624016211f8ae6487422/687474703a2f2f626c2e6f636b732e6f72672f6f7979642f7261772f38353966616663383132323937376133616664362f7468756d626e61696c2e706e67';

function About() {
  return _react2.default.createElement(
    _SimpleApp2.default,
    null,
    _react2.default.createElement(
      'div',
      { className: 'region' },
      _react2.default.createElement(
        'h2',
        { className: 'mdl-typography--display-1' },
        'About me'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Hi，我每天都会写不少代码，并思考其中的事情。你可能有兴趣了解得更多一点：'
      ),
      _react2.default.createElement(
        'ul',
        { style: LIST_STYLE },
        _react2.default.createElement(
          'li',
          null,
          '我花了一年多的时间学习日语，考了',
          _react2.default.createElement(
            'a',
            { href: JLPT_WIKI_URL, target: '_blank' },
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
            { href: ATOLS_YOUTUBE_URL, target: '_blank' },
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
        { className: 'mdl-typography--display-1' },
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
        { className: 'mdl-typography--display-1' },
        'Works'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'content' },
        _react2.default.createElement(
          'li',
          null,
          '协作者 ',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/mozilla/nunjucks', target: '_blank' },
            'mozilla/nunjucks'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          '翻译 ',
          _react2.default.createElement(
            'a',
            {
              href: 'https://www.gitbook.com/book/oyyd/typescript-handbook-zh/details',
              target: '_blank'
            },
            'Typescript Handbook'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'div',
            null,
            'D3 Gallery -',
            _react2.default.createElement(
              'a',
              { href: 'http://bl.ocks.org/oyyd/859fafc8122977a3afd6', target: '_blank' },
              'Days-Hours Heatmap'
            )
          ),
          _react2.default.createElement('img', { style: IMG_STYLE, src: D3_GALLERY_SRC, alt: 'Days-Hours Heatmap' })
        )
      )
    )
  );
}

About.title = 'oyyd-blog - 关于我';

exports.default = About;