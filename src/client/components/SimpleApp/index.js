import React, { Component, } from 'react';

import Header from './Header';

class SimpleApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='oyyd-blog'>
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='footer'>
        <p>
          <span>Built by </span>
          <a href='https://github.com/oyyd/oyyd-blog'>oyyd-blog</a>
          <span> and styled by modified </span>
          <a href='https://www.getmdl.io/index.html'>material-design-lite</a>
          <span>.</span>
        </p>
        <p className='cert'>京ICP备14040206号-1</p>
      </div>
    );
  }
}

export default SimpleApp;
