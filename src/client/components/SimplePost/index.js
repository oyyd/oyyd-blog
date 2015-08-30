import React from 'react';
import {State} from 'react-router';
import hljs from 'highlight.js/lib/highlight.js';
import $ from 'jquery';

import translate from './translate';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

function highlightCode(codeBlockArr){
  for (var i=0;i<codeBlockArr.length;i++){
    hljs.highlightBlock(codeBlockArr[i]);
  }
}

let SimplePost = React.createClass({
  mixins:[State],
  getInitialState(){
    return{
      content: ''
    }
  },
  componentWillMount(){
    $.get('/posts/' + this.getParams().id + '.md').done((data)=>{
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
      <div dangerouslySetInnerHTML={{__html: translate(this.props.children.toString())}} />
    );
  }
});

export default SimplePost;
