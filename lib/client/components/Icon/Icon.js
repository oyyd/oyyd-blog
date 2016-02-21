'use strict';

var React = require('react');
var $ = require('jquery');

// ic_alarm_on_24px.svg
var Icon = React.createClass({
  srcPreFix: '/static/svg',
  getDefaultProps: function getDefaultProps() {
    return {
      picColor: '#fff',
      picSize: 24
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.picSrc) {
      var src = this.srcPreFix;
      if (this.props.picSrc[0] !== '/') {
        src = src + '/';
      }

      src = src + this.props.picSrc;

      $.get(src, function (data) {
        var $svg = $(data).find('svg');
        $svg.css({
          fill: this.props.picColor,
          width: this.props.picSize,
          height: this.props.picSize
        });
        $(React.findDOMNode(this.refs.wrapper)).append($svg);
      }.bind(this), 'xml');
    }
  },
  render: function render() {
    return React.createElement('span', { className: 'blog-Icon', ref: 'wrapper' });
  }
});

module.exports = Icon;