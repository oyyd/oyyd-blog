// import React from 'react';
var React = require('react');
var marked = require('marked');

var PostViewer = React.createClass({
  render() {
    return (
      <Editor>###Hello world!</Editor>
    );
  }
});

var Editor = React.createClass({
  render() {
    return(
      <div dangerouslySetInnerHTML={{__html: marked(this.props.children.toString())}} />
    );
  }
});

module.exports = PostViewer;