'use strict';

var React = require('react');

var ErrorPage = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      errorCode: 404
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.errorCode
    );
  }
});

module.exports = ErrorPage;