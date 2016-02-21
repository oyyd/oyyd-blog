import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { curry, flowRight} from 'lodash';
import { connect, } from 'react-redux';
import { renderCharts, } from 'marked-chartjs-binding';

import CONSTANTS from '../../CONSTANTS';
import Disqus from '../Disqus';
import getPostUrl from '../../utils/getPostUrl';
import isBrowser from '../../utils/isBrowser';

const forEach = [].forEach;

const {string} = React.PropTypes;

const CODEMIRROR_DEFAULT_CONFIG = {
  htmlMode: true,
  readOnly: true,
  lineNumbers: true,
  lineWrapping: true,
  theme: 'monokai-sublime',
  tabSize: 2,
};

function getModeFromNode(codeDOMNode) {
  let lang = codeDOMNode.getAttribute('class');
  if (!lang) {
    return '';
  }

  lang = lang.slice(lang.indexOf('lang-') + 5);
  switch (lang.toLowerCase()) {
    case 'js':
    case 'javascript':
      return 'javascript';
    case 'html':
    case 'xml':
      return 'xml';
    default:
      return '';
  }
}

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

// TODO: avoid double highlight
function highlightCode(codeBlockArr) {
  if (!isBrowser() || codeBlockArr.length === 0) {
    return;
  }

  forEach.call(codeBlockArr, codeDOM => {
    const config = Object.assign({}, CODEMIRROR_DEFAULT_CONFIG, {
      value: htmlDecode(codeDOM.innerHTML),
      mode: getModeFromNode(codeDOM),
    });

    new CodeMirror((elt) => {
      codeDOM.parentNode.parentNode.replaceChild(elt, codeDOM.parentNode);
    }, config);
  });
}

class SimplePost extends React.Component {
  render() {
    const id = `${CONSTANTS.DISQUS.ARTICLE_ID_PREFIX}${this.props.title}`;
    const url = getPostUrl(this.props.fileName);

    return (
      <div className='blog-simple-post region'>
        <MarkedContent>{this.props.htmlContent}</MarkedContent>
        <Disqus initialIdentifier={id}
          initialTitle={this.props.title} initialUrl={url}/>
      </div>
    );
  }
}

SimplePost.propTypes = {
  title: string,
  fileName: string,
  htmlContent: string,
};

const MarkedContent = React.createClass({
  componentDidMount() {
    this.highlightCodes();
    renderCharts();
  },

  componentDidUpdate() {
    this.highlightCodes();
    renderCharts();
  },

  highlightCodes() {
    let codes = ReactDOM.findDOMNode(this).querySelectorAll('pre code');
    highlightCode(codes);
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.children.toString()}} />
    );
  },
});

function select(state) {
  const {title, htmlContent, fileName} = state.post;

  return {
    title,
    fileName,
    htmlContent,
  };
}

const ConnectedSimplePost = connect(select)(SimplePost);

export default ConnectedSimplePost;
