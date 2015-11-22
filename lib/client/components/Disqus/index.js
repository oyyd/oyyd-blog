'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CONSTANTS = require('../../CONSTANTS');

var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inNode = typeof window === 'undefined';
var string = _react2.default.PropTypes.string;

var Disqus = _react2.default.createClass({
  propTypes: {
    initialIdentifier: string,
    initialTitle: string,
    initialUrl: string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      initialIdentifier: _CONSTANTS2.default.DISQUS.DEFAULT_IDENTIFIER,
      initialTitle: _CONSTANTS2.default.DISQUS.DEFAULT_TITLE,
      initialUrl: inNode ? '' : location.href
    };
  },
  componentDidMount: function componentDidMount() {
    this.requireInit();

    // if(window.DISQUS){
    //   this.configInit();
    // }else{
    //   this.requireInit();
    // }
  },
  requireInit: function requireInit() {
    if (inNode) {
      return;
    }

    // jscs:disable
    window.disqus_shortname = _CONSTANTS2.default.DISQUS.SHORT_NAME;
    window.disqus_identifier = this.props.initialIdentifier;
    window.disqus_title = this.props.initialTitle;
    window.disqus_url = this.props.initialUrl;

    (function () {
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    // jscs:enable
  },

  // configInit(){
  //   window.DISQUS.reset({
  //     reload: true,
  //     config: () => {
  //       this.page.identifier = this.props.initialIdentifier;
  //       this.page.title = this.props.initialTitle;
  //       this.page.url = this.props.initialUrl;
  //     }
  //   });
  // },
  // disqusTempData: {},
  // resetConfig(identifier, title, url){
  //   if(window.DISQUS){
  //     if(!identifier){
  //       return;
  //     }
  //     if(!url){
  //       url = location.href;
  //     }
  //     if(!title){
  //       title = document.title;
  //     }
  //     window.DISQUS.reset({
  //       reload: true,
  //       config: function () {
  //         this.page.identifier = identifier;
  //         this.page.title = title;
  //         this.page.url = url;
  //       }
  //     });
  //   }else{
  //     this.disqusTempData = {identifier, title, url};
  //     this.startCheckingTimer();
  //   }
  // },
  // disqusInited:false,
  // startCheckingTimer(){
  //   if(!this.disqusInited){
  //     setTimeout(() => {
  //       if(window.DISQUS){
  //         this.disqusInited = true;
  //         const {identifier, title, url} = this.disqusTempData;
  //         window.DISQUS.reset({
  //           reload: true,
  //           config: () => {
  //             this.page.identifier = identifier;
  //             this.page.title = title;
  //             this.page.url = url;
  //           }
  //         });
  //       }else{
  //         this.startCheckingTimer();
  //       }
  //     }, 1000);
  //   }
  // },
  render: function render() {
    return _react2.default.createElement('div', { className: 'blog-disqus', id: 'disqus_thread' });
  }
});

exports.default = Disqus;