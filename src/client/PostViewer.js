// import React from 'react';
const React = require('react');
const marked = require('marked');
const hljs = require('highlight.js/lib/highlight.js');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var PostViewer = React.createClass({
  render() {
    let string = '#Hello world!\n'
    + '```js\n'
    + 'var a = function(a){alert(a)};'
    + '```';
    return (
      <Editor >{string}</Editor>
    );
  }
});

var Editor = React.createClass({
  componentDidUpdate(){
    hljs.highlightBlock(React.findDOMNode(this));
  },
  render() {
    return(
      <div dangerouslySetInnerHTML={{__html: marked(this.props.children.toString())}} />
    );
  }
});

module.exports = PostViewer;