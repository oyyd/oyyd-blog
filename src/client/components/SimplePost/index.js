import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js/lib/highlight.js';
import $ from 'jquery';
import {curry, flowRight} from 'lodash';
import {connect} from 'react-redux';

import Disqus from '../Disqus';
import translate from './translate';

// TODO: init hljs somewhere else
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const {string} = React.PropTypes;

function highlightCode(codeBlockArr) {
  for (var i = 0; i < codeBlockArr.length; i++) {
    hljs.highlightBlock(codeBlockArr[i]);
  }
}

class SimplePost extends React.Component {
  render() {
    return (
      <div className='blog-simple-post'>
        <MarkedContent>{this.state.content}</MarkedContent>
        <Disqus initialIdentifier={`article_${this.props.title}`}
          initialUrl={`http://blog.oyyd.net/article_${this.props.htmlContent}`}/>
      </div>
    );
  }
}

SimplePost.propTypes = {
  title: string,
  htmlContent: string,
};

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

function select(state) {
  const {title, htmlContent} = state.post;
  return {
    title,
    htmlContent,
  };
}

const ConnectedSimplePost = connect(select)(SimplePost);

export default ConnectedSimplePost;
