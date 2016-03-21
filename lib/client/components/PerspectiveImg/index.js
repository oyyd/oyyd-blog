'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React$PropTypes = _react2.default.PropTypes;
var string = _React$PropTypes.string;
var number = _React$PropTypes.number;


var START_RATIO = 1.3,
    END_RATIO = 1,
    ANIMATION_TIME = 24;

function getZeroIfNaN(number) {
  if (isNaN(number)) {
    return 0;
  }

  return number;
}

var PerspectiveImg = function (_React$Component) {
  _inherits(PerspectiveImg, _React$Component);

  function PerspectiveImg(props) {
    _classCallCheck(this, PerspectiveImg);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectiveImg).call(this, props));

    var width = props.width;
    var height = props.height;
    var containerWidth = props.containerWidth;
    var containerHeight = props.containerHeight;


    _this.ratio = START_RATIO;

    var imgStyle = Object.assign({}, style, _this.getImgStyle(true, props));

    _this.state = {
      start: false,
      show: false,
      imgStyle: imgStyle
    };

    _this.getImgStyle = _this.getImgStyle.bind(_this);
    return _this;
  }

  _createClass(PerspectiveImg, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        start: true
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.state = {
        imgStyle: Object.assign({}, style, this.getImgStyle(this.state.show, props))
      };
    }
  }, {
    key: 'getImgStyle',
    value: function getImgStyle(show, props) {
      props = props || this.props;

      var _props = props;
      var width = _props.width;
      var height = _props.height;
      var containerWidth = _props.containerWidth;
      var containerHeight = _props.containerHeight;
      var ratio = this.ratio;


      var newWidth = containerWidth * ratio;
      var newHeight = newWidth * height / width;

      return {
        top: getZeroIfNaN((containerHeight - newHeight) / 2),
        left: getZeroIfNaN((containerWidth - newWidth) / 2),
        width: getZeroIfNaN(newWidth),
        height: getZeroIfNaN(newHeight)
      };
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      this.ratio = END_RATIO;

      this.setState({
        show: true,
        imgStyle: Object.assign({
          transition: ANIMATION_TIME + 's'
        }, style, this.getImgStyle(this.state.show))
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', { onLoad: this.startAnimation.bind(this),
        style: this.state.imgStyle,
        src: this.state.start ? this.props.src : null });
    }
  }]);

  return PerspectiveImg;
}(_react2.default.Component);

PerspectiveImg.propTypes = {
  src: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  containerWidth: number.isRequired,
  containerHeight: number.isRequired
};

var style = {
  position: 'absolute'
};

exports.default = PerspectiveImg;