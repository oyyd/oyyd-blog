/* global CodeMirror */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { renderCharts } from 'marked-chartjs-binding';

import CONSTANTS from '../../CONSTANTS';
import Disqus from '../Disqus';
import getPostUrl from '../../utils/getPostUrl';
import isBrowser from '../../utils/isBrowser';

const forEach = [].forEach;

const { string } = React.PropTypes;

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
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

// TODO: avoid double highlight
function highlightCode(codeBlockArr) {
  if (!isBrowser() || codeBlockArr.length === 0) {
    return;
  }

  forEach.call(codeBlockArr, (codeDOM) => {
    const config = Object.assign({}, CODEMIRROR_DEFAULT_CONFIG, {
      value: htmlDecode(codeDOM.innerHTML),
      mode: getModeFromNode(codeDOM),
    });

    // eslint-disable-next-line
    new CodeMirror((elt) => {
      codeDOM.parentNode.parentNode.replaceChild(elt, codeDOM.parentNode);
    }, config);
  });
}

// eslint-disable-next-line
const MarkedContent = React.createClass({
  componentDidMount() {
    this.highlightCodes();
    this.wrapImgs();
    renderCharts();
  },

  componentDidUpdate() {
    this.highlightCodes();
    renderCharts();
  },

  highlightCodes() {
    // eslint-disable-next-line
    const codes = ReactDOM.findDOMNode(this).querySelectorAll('pre code');
    highlightCode(codes);
  },

  wrapImgs() {
    // eslint-disable-next-line
    const imgs = ReactDOM.findDOMNode(this).querySelectorAll('img');

    if (!isBrowser() || imgs.length === 0) {
      return;
    }

    imgs.forEach((imgEle) => {
      const src = imgEle.getAttribute('src');
      const { parentNode } = imgEle;

      const aEle = document.createElement('a');

      aEle.setAttribute('href', src);
      aEle.setAttribute('target', '_blank');

      parentNode.replaceChild(aEle, imgEle);

      aEle.appendChild(imgEle);
    });
  },

  render() {
    // eslint-disable-next-line
    return <div dangerouslySetInnerHTML={{ __html: this.props.children.toString() }} />;
  },
});

// eslint-disable-next-line
class SimplePost extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    const id = `${CONSTANTS.DISQUS.ARTICLE_ID_PREFIX}${this.props.title}`;
    const url = getPostUrl(this.props.fileName);

    return (
      <div className="blog-simple-post region">
        <MarkedContent>
          {this.props.htmlContent}
        </MarkedContent>
        <Disqus
          initialIdentifier={id}
          initialTitle={this.props.title} initialUrl={url}
        />
      </div>
    );
  }
}

SimplePost.propTypes = {
  title: string,
  fileName: string,
  htmlContent: string,
};

function select(state) {
  const { title, htmlContent, fileName } = state.post;

  return {
    title,
    fileName,
    htmlContent,
  };
}

const ConnectedSimplePost = connect(select)(SimplePost);

export default ConnectedSimplePost;
