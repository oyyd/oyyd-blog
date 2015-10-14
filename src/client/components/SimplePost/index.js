import React from 'react';
import {State} from 'react-router';
import hljs from 'highlight.js/lib/highlight.js';
import $ from 'jquery';
import {curry, flowRight} from 'lodash';

import Disqus from '../Disqus';
import translate from './translate';

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

const getPostUrl = id => {
  return '/posts/' + id + '.md'
};

const getPostText = curry((callback, url) => {
  $.get(url, callback);
});

const log = data => {
  return data;
};

const setContent = curry((comp, data) => {
    comp.setState({
      content: data
    });
});

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
  initState(comp){
    const postTextHandler = flowRight(setContent(comp), log);
    const initState = flowRight(getPostText(postTextHandler), getPostUrl);
    initState(comp.getParams().id);
  },
  componentDidMount(){
    this.initState(this);
  },
  render(){
    return(
      <div className="blog-simple-post">
        <MarkedContent>{this.state.content}</MarkedContent>
        <Disqus initialIdentifier={`article_${this.getParams().id}`}
          initialUrl={`http://blog.oyyd.net/article_${this.getParams().id}`}/>
      </div>
    )
  }
});

const MarkedContent = React.createClass({
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
