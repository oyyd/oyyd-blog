const React = require('react');
const marked = require('marked');
const hljs = require('highlight.js/lib/highlight.js');
const $ = require('jquery');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var PostViewer = React.createClass({
  render(){
    console.log(this.props.params.id);
    return (
      <PostDetail contentType="markdown">{string}</PostDetail>
    );
  }
});

PostViewer.Wordpress = React.createClass({
  replacePairs: [{
    reg: /http:\/\/115\.29\.98\.228\/wp-content\/uploads/g,
    value: '/static/wp'
  },{
    reg: /http:\/\/oyyd\.net\/wp-content\/uploads/g,
    value: '/static/wp'
  }],
  getInitialState(){
    return {
      title: '',
      content : ''
    };
  },
  componentDidMount(){
    $.get('/wordpress/post/' + this.props.params.id).done(function(data){
      this.setState({
        title: data.postTitle,
        content: this.handleWordpressContent(data.postContent)
      });
    }.bind(this));
  },
  handleWordpressContent(content){
    var handledContent = content;
    for(var i=0;i<this.replacePairs.length;i++){
      handledContent = handledContent.replace(this.replacePairs[i].reg, this.replacePairs[i].value);
    }
    return handledContent;
  },
  render(){
    return(
      <PostDetail contentType="HTML">{this.state.content}</PostDetail>
    )
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
      <div className="blog-HTMLContent" dangerouslySetInnerHTML={{__html: this.props.children.toString()}}/>
    )
  }
});

module.exports = PostViewer;