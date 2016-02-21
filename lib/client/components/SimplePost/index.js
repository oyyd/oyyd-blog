'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _reactRedux = require('react-redux');

var _markedChartjsBinding = require('marked-chartjs-binding');

var _CONSTANTS = require('../../CONSTANTS');

var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

var _Disqus = require('../Disqus');

var _Disqus2 = _interopRequireDefault(_Disqus);

var _getPostUrl = require('../../utils/getPostUrl');

var _getPostUrl2 = _interopRequireDefault(_getPostUrl);

var _isBrowser = require('../../utils/isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var forEach = [].forEach;

var string = _react2.default.PropTypes.string;


var CODEMIRROR_DEFAULT_CONFIG = {
  htmlMode: true,
  readOnly: true,
  lineNumbers: true,
  lineWrapping: true,
  theme: 'monokai-sublime',
  tabSize: 2
};

function getModeFromNode(codeDOMNode) {
  var lang = codeDOMNode.getAttribute('class');
  if (!lang) {
    return '';
  }

  lang = lang.slice(lang.indexOf('lang-') + 5);
  switch (lang.toLowerCase()) {
    case 'js':
    case 'javascript':
      return 'javascript';
    case 'html':
    case 'xml':
      return 'xml';
    default:
      return '';
  }
}

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

// TODO: avoid double highlight
function highlightCode(codeBlockArr) {
  if (!(0, _isBrowser2.default)() || codeBlockArr.length === 0) {
    return;
  }

  forEach.call(codeBlockArr, function (codeDOM) {
    var config = Object.assign({}, CODEMIRROR_DEFAULT_CONFIG, {
      value: htmlDecode(codeDOM.innerHTML),
      mode: getModeFromNode(codeDOM)
    });

    new CodeMirror(function (elt) {
      codeDOM.parentNode.parentNode.replaceChild(elt, codeDOM.parentNode);
    }, config);
  });
}

var SimplePost = function (_React$Component) {
  _inherits(SimplePost, _React$Component);

  function SimplePost() {
    _classCallCheck(this, SimplePost);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimplePost).apply(this, arguments));
  }

  _createClass(SimplePost, [{
    key: 'render',
    value: function render() {
      var id = '' + _CONSTANTS2.default.DISQUS.ARTICLE_ID_PREFIX + this.props.title;
      var url = (0, _getPostUrl2.default)(this.props.fileName);

      return _react2.default.createElement(
        'div',
        { className: 'blog-simple-post region' },
        _react2.default.createElement(
          MarkedContent,
          null,
          this.props.htmlContent
        ),
        _react2.default.createElement(_Disqus2.default, { initialIdentifier: id,
          initialTitle: this.props.title, initialUrl: url })
      );
    }
  }]);

  return SimplePost;
}(_react2.default.Component);

SimplePost.propTypes = {
  title: string,
  fileName: string,
  htmlContent: string
};

var MarkedContent = _react2.default.createClass({
  componentDidMount: function componentDidMount() {
    this.highlightCodes();
    (0, _markedChartjsBinding.renderCharts)();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.highlightCodes();
    (0, _markedChartjsBinding.renderCharts)();
  },
  highlightCodes: function highlightCodes() {
    var codes = _reactDom2.default.findDOMNode(this).querySelectorAll('pre code');
    highlightCode(codes);
  },
  render: function render() {
    return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.children.toString() } });
  }
});

function select(state) {
  var _state$post = state.post;
  var title = _state$post.title;
  var htmlContent = _state$post.htmlContent;
  var fileName = _state$post.fileName;


  return {
    title: title,
    fileName: fileName,
    htmlContent: htmlContent
  };
}

var ConnectedSimplePost = (0, _reactRedux.connect)(select)(SimplePost);

exports.default = ConnectedSimplePost;