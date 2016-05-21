'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactRedux = require('react-redux');

var _PerspectiveImg = require('../PerspectiveImg');

var _PerspectiveImg2 = _interopRequireDefault(_PerspectiveImg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var string = _react2.default.PropTypes.string;


var ACTIVE_ITEMS = {
  ABOUT: 'ABOUT',
  POST_LIST: 'POST_LIST'
};

var HEADER_HEIGHT = 200;
var BG_IMG_WIDTH = 1300;
var BG_IMG_HEIGHT = 600;
var BG_IMGS = ['/static/img/app/header-bg/1.png', '/static/img/app/header-bg/2.png', '/static/img/app/header-bg/3.png', '/static/img/app/header-bg/4.png', '/static/img/app/header-bg/5.png'];
var BG_IMGS_LENGTH = BG_IMGS.length;

function getActiveItem(path) {
  switch (path) {
    case '/about':
      return ACTIVE_ITEMS.ABOUT;
    default:
      return ACTIVE_ITEMS.POST_LIST;
  }
}

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));

    var randomIndex = Math.round(Math.random() * (BG_IMGS_LENGTH - 1));

    _this.bgImg = BG_IMGS[randomIndex];

    _this.state = {
      windowWidth: 0
    };

    _this.handleResizing = _this.handleResizing.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$window = (0, _jquery2.default)(window);
      this.$window.resize(this.handleResizing);
      this.handleResizing();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.$window.unbind('resize', this.handleResizing);
    }
  }, {
    key: 'handleResizing',
    value: function handleResizing() {
      var windowWidth = this.$window.width();

      this.setState({
        windowWidth: windowWidth
      });
    }
  }, {
    key: 'renderNav',
    value: function renderNav() {
      var ACTIVE_ITEM = getActiveItem(this.props.path);

      return _react2.default.createElement(
        'div',
        { className: 'nav' },
        _react2.default.createElement(
          'div',
          { className: 'column' },
          _react2.default.createElement(
            'a',
            {
              className: ACTIVE_ITEM === ACTIVE_ITEMS.POST_LIST ? 'item active' : 'item',
              href: '/'
            },
            'POST LIST'
          ),
          _react2.default.createElement(
            'a',
            {
              className: ACTIVE_ITEM === ACTIVE_ITEMS.ABOUT ? 'item active' : 'item',
              href: '/about', title: 'about me'
            },
            'ABOUT'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'links' },
          _react2.default.createElement(
            'a',
            {
              className: 'header-icon github-link',
              href: 'https://github.com/oyyd',
              title: 'github'
            },
            _react2.default.createElement('span', { className: 'icon-github' })
          ),
          _react2.default.createElement(
            'a',
            {
              className: 'header-icon rss-feed',
              href: '/dist/feed.xml',
              title: 'rss feed'
            },
            _react2.default.createElement('span', { className: 'icon-feed4' })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'header' },
        _react2.default.createElement(_PerspectiveImg2.default, {
          src: this.bgImg,
          containerWidth: this.state.windowWidth,
          containerHeight: HEADER_HEIGHT,
          width: BG_IMG_WIDTH,
          height: BG_IMG_HEIGHT
        }),
        _react2.default.createElement(
          'div',
          { className: 'hover-content' },
          _react2.default.createElement(
            'h1',
            { className: 'site-name no-deco' },
            'OYYD BLOG',
            _react2.default.createElement('br', null),
            'Yadong博客'
          ),
          this.renderNav()
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  path: string
};

function mapState(state) {
  return {
    path: state.routing.location.pathname
  };
}

var ConnectedHeader = (0, _reactRedux.connect)(mapState)(Header);

exports.default = ConnectedHeader;