const React = require('react');
const marked = require('marked');
const hljs = require('highlight.js/lib/highlight.js');
const mui = require('material-ui');
const $ = require('jquery');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var highlightCode = function(codeBlockArr){
  for (var i=0;i<codeBlockArr.length;i++){
    hljs.highlightBlock(codeBlockArr[i]);
  }
};

var PostViewer = React.createClass({
  getInitialState(){
    return {
      content: null
    };
  },
  componentDidMount(){
    $.get('/post/' + this.props.params.id).done(function(post){
      var content = '#' + post.title + '\n\n' + post.content;
      this.setState({
        content: content
      });
    }.bind(this));
  },
  render(){
    return (
      <PostDetail contentType="markdown">{(this.state.content)?this.state.content:''}</PostDetail>
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
  },{
    reg: /\n/g,
    value: '<br/>'
  }],
  getInitialState(){
    return {
      content : ''
    };
  },
  componentDidMount(){
    $.get('/wordpress/post/' + this.props.params.id).done(function(data){
      //add title
      data.postContent = '<h1 class="entry-title">'+data.postTitle+'</h1><br/>' + data.postContent;

      this.setState({
        content: this.handleWordpressContent(data.postContent)
      }, function(){
        let pres = React.findDOMNode(this).querySelectorAll('pre');
        highlightCode(pres);
      }.bind(this));
    }.bind(this));
  },

  handleWordpressContent(content){
    window.content = content;
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
    let detail = null;
    if(this.props.contentType === 'markdown'){
      detail = <MarkedContent>{this.props.children}</MarkedContent>;
    }else if(this.props.contentType === 'HTML'){
      detail = <HTMLContent>{this.props.children}</HTMLContent>;
    }
    return (
      <mui.Paper className="blog-PostDetail">
        {detail}
      </mui.Paper>
    )
  }
});

var MarkedContent = React.createClass({
  componentDidMount(){
    let codes = React.findDOMNode(this).querySelectorAll('code');
    highlightCode(codes);
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