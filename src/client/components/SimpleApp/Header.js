import React, { Component } from 'react';
import $ from 'jquery';

import { connect } from 'react-redux';
import PerspectiveImg from '../PerspectiveImg';

const { string } = React.PropTypes;

const ACTIVE_ITEMS = {
  ABOUT: 'ABOUT',
  POST_LIST: 'POST_LIST',
};

const HEADER_HEIGHT = 200;
const BG_IMG_WIDTH = 1300;
const BG_IMG_HEIGHT = 600;
const BG_IMGS = [
  '/static/img/app/header-bg/1.png',
  '/static/img/app/header-bg/2.png',
  '/static/img/app/header-bg/3.png',
  '/static/img/app/header-bg/4.png',
  '/static/img/app/header-bg/5.png',
];
const BG_IMGS_LENGTH = BG_IMGS.length;

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

    const randomIndex = Math.round(Math.random() * (BG_IMGS_LENGTH - 1));

    this.bgImg = BG_IMGS[randomIndex];

    this.state = {
      windowWidth: 0,
    };

    this.handleResizing = this.handleResizing.bind(this);
  }

  componentDidMount() {
    this.$window = $(window);
    this.$window.resize(this.handleResizing);
    this.handleResizing();
  }

  componentWillUnmount() {
    this.$window.unbind('resize', this.handleResizing);
  }

  handleResizing() {
    const windowWidth = this.$window.width();

    this.setState({
      windowWidth,
    });
  }

  renderNav() {
    const ACTIVE_ITEM = getActiveItem(this.props.path);

    return (
      <div className="nav">
        <div className="column">
          <a
            className={ACTIVE_ITEM === ACTIVE_ITEMS.POST_LIST ? 'item active' : 'item'}
            href="/"
          >
            POST LIST
          </a>
          <a
            className={ACTIVE_ITEM === ACTIVE_ITEMS.ABOUT ? 'item active' : 'item'}
            href="/about" title="about me"
          >
            ABOUT
          </a>
        </div>
        <div className="links">
          <a
            className="header-icon github-link"
            href="https://github.com/oyyd"
            title="github"
          >
            <span className="icon-github" />
          </a>
          <a
            className="header-icon rss-feed"
            href="/dist/feed.xml"
            title="rss feed"
          >
            <span className="icon-feed4" />
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <PerspectiveImg
          src={this.bgImg}
          containerWidth={this.state.windowWidth}
          containerHeight={HEADER_HEIGHT}
          width={BG_IMG_WIDTH}
          height={BG_IMG_HEIGHT}
        />
        <div className="hover-content">
          <h1 className="site-name no-deco">OYYD BLOG</h1>
          {this.renderNav()}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  path: string,
};

function mapState(state) {
  return {
    path: state.routing.location.pathname,
  };
}

const ConnectedHeader = connect(mapState)(Header);

export default ConnectedHeader;
