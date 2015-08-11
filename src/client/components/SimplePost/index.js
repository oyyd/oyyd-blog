import React from 'react';
import {State} from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight.js';
import $ from 'jquery';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var highlightCode = function(codeBlockArr){
  for (var i=0;i<codeBlockArr.length;i++){
    hljs.highlightBlock(codeBlockArr[i]);
  }
};

let SimplePost = React.createClass({
  mixins:[State],
  getInitialState(){
    return{
      content: ''
    }
  },
  componentDidMount(){
    $.get('./test/why_this.md').done((data)=>{
      this.setState({
        content: data
      });
    });
  },
  render(){
    return(
      <div className="blog-simple-post">
        <MarkedContent>{this.state.content}</MarkedContent>
      </div>
    )
  }
});

let MarkedContent = React.createClass({
  componentDidMount(){
    this.highlightCodes();
  },
  componentDidUpdate(){
    this.highlightCodes();
  },
  highlightCodes(){
    let codes = React.findDOMNode(this).querySelectorAll('code');
    highlightCode(codes);
  },
  render() {
    return(
      <div dangerouslySetInnerHTML={{__html: marked(this.props.children.toString())}} />
    );
  }
});

export default SimplePost;
