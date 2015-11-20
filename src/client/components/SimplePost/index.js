import React from 'react';
import ReactDOM from 'react-dom';
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
  return '/posts/' + id + '.md';
};

const getPostText = curry((callback, url) => {
  $.get(url, callback);
});

const log = data => {
  return data;
};

const setContent = curry((comp, data) => {
  comp.setState({
      content: data,
    });
});

function highlightCode(codeBlockArr) {
  for (var i = 0; i < codeBlockArr.length; i++) {
    hljs.highlightBlock(codeBlockArr[i]);
  }
}

let SimplePost = React.createClass({
  getInitialState() {
    return {
      content: this.props.content ? this.props.content : '',
    };
  },

  initState(comp) {
    const postTextHandler = flowRight(setContent(comp), log);
    const initState = flowRight(getPostText(postTextHandler), getPostUrl);
    initState(comp.props.params.id);
  },

  componentDidMount() {
    if (!this.state.content) {
      this.initState(this);
    }
  },

  render() {
    return (
      <div className='blog-simple-post'>
        <MarkedContent>{this.state.content}</MarkedContent>
        <Disqus initialIdentifier={`article_${this.props.params.id}`}
          initialUrl={`http://blog.oyyd.net/article_${this.props.params.id}`}/>
      </div>
    );
  },
});

const MarkedContent = React.createClass({
  componentDidMount() {
    this.highlightCodes();
  },

  componentDidUpdate() {
    this.highlightCodes();
  },

  highlightCodes() {
    let codes = ReactDOM.findDOMNode(this).querySelectorAll('code');
    highlightCode(codes);
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: translate(this.props.children.toString())}} />
    );
  },
});

export default SimplePost;
