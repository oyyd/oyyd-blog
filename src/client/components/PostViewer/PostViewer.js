const React = require('react');
const marked = require('marked');
const hljs = require('highlight.js/lib/highlight.js');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var PostViewer = React.createClass({
  render(){
    console.log(this.props.params.id);
    let string = '#Hello world!\n'
      + '```javascript\n'
      + 'var a = function(a){alert(a)};\n'
      + 'function b(abc){}' 
      + '```';
    return (
      <PostDetail contentType="HTML">{string}</PostDetail>
    );
  }
});

var PostDetail = React.createClass({
  getDefaultProps(){
    return {
      contentType: 'HTML'
    };
  },
  render() {
    if(this.props.contentType === 'markdown'){
      return (
        <MarkedContent>{this.props.children}</MarkedContent>
      );      
    }else if(this.props.contentType === 'HTML'){
      return (
        <HTMLContent>{this.props.children}</HTMLContent>
      )
    }
  }
});

var MarkedContent = React.createClass({
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

var HTMLContent = React.createClass({
  render(){
    return(
      <div dangerouslySetInnerHTML={{__html: this.props.children.toString()}}/>
    )
  }
});

module.exports = PostViewer;