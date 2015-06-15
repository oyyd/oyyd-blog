const React = require('react');
const marked = require('marked');
const hljs = require('highlight.js/lib/highlight.js');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var PostViewer = React.createClass({
  render() {
    let string = '#Hello world!\n'
    + '```javascript\n'
    + 'var a = function(a){alert(a)};\n'
    + 'function b(abc){}' 
    + '```';
    return (
      <Editor >{string}</Editor>
    );
  }
});

var Editor = React.createClass({
  componentDidMount(){
    let codes = React.findDOMNode(this).querySelectorAll('code');
    for (var i=0;i<codes.length;i++){
      hljs.highlightBlock(codes[i]);
    }
  },
  render() {
    return(
      <div dangerouslySetInnerHTML={{__html: marked(this.props.children.toString())}} />
    );
  }
});

module.exports = PostViewer;