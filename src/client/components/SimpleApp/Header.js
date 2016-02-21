import React, { Component, } from 'react';

import { connect, } from 'react-redux';

const ACTIVE_ITEMS = {
  ABOUT: 'ABOUT',
  POST_LIST: 'POST_LIST',
};

function getActiveItem(path) {
  switch (path) {
    case '/about':
      return ACTIVE_ITEMS.ABOUT;
    default:
      return ACTIVE_ITEMS.POST_LIST;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header'>
        <h1 href='/' className='site-name no-deco' title='返回列表'>
          OYYD BLOG
          <br/>
          亚东博客
        </h1>
        {this.renderNav()}
      </div>
    );
  }

  renderNav() {
    const ACTIVE_ITEM = getActiveItem(this.props.path);

    return (
      <div className='nav'>
        <div className='column'>
          <a className={ACTIVE_ITEM === ACTIVE_ITEMS.POST_LIST ? 'item active' : 'item'}
            href='/'>
            POST LIST
          </a>
          <a className={ACTIVE_ITEM === ACTIVE_ITEMS.ABOUT ? 'item active' : 'item'}
            href='/about' title='about me'>
            ABOUT
          </a>
        </div>
        <div className='links'>
          <a className='header-icon github-link' href='https://github.com/oyyd' title='github'>
            <span className='icon-github'/>
          </a>
          <a className='header-icon rss-feed' href='/dist/feed.xml' title='rss feed'>
            <span className='icon-feed4'/>
          </a>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    path: state.routing.location.pathname,
  };
}

const ConnectedHeader = connect(mapState)(Header);

export default ConnectedHeader;
