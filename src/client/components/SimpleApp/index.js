import React from 'react';

const SimpleApp = React.createClass({
  render() {
    return (
      <div className='oyyd-blog'>
        {this.renderHeader()}
        <div className='content'>
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  },

  renderHeader() {
    return (
      <div className='header'>
        <h1>
          <a href='/' className='site-name' title='返回列表'>oyyd blog</a>
          <a className='header-icon github-link' href='https://github.com/oyyd' title='github'>
            <span className='icon-github'/>
          </a>
          <a className='header-icon rss-feed' href='/dist/feed.xml' title='rss feed'>
            <span className='icon-feed4'/>
          </a>
          <a className='header-icon' href='/about' title='about me' style={{
            marginLeft: '5%',
            verticalAlign: 'middle',
            borderBottom: 'none',
          }}>
            <span className='alike-icon' style={{
              fontSize: 18,
              display: 'inline-block',
            }}>
              About
            </span>
          </a>
        </h1>
      </div>
    );
  },

  renderFooter() {
    return (
      <div className='footer'>
        <p>
          <span>Built by </span>
          <a href='https://github.com/oyyd/oyyd-blog'>oyyd-blog</a>
          <span> and styled by modified </span>
          <a href='https://github.com/daveliepmann/tufte-css'>tufte-css</a>
          <span>.</span>
        </p>
        <p className='cert'>京ICP备14040206号-1</p>
      </div>
    );
  },
});

export default SimpleApp;
