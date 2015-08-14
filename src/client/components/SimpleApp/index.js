import React from 'react';
import {RouteHandler} from 'react-router';

let SimpleApp = React.createClass({
  render(){
    return (
      <div className="oyyd-blog">
        {this.renderHeader()}
        <div className="content">
          <RouteHandler/>
        </div>
        {this.renderFooter()}
      </div>
    )
  },
  renderHeader(){
    return (
      <div className="header">
        <h1>
          <span>oyyd blog</span>
          <a className="github-link" href="https://github.com/oyyd">
            <img src="/static/img/icon/social-github-outline.png"/>
          </a>
        </h1>
      </div>
    )
  },
  renderFooter(){
    return(
      <div className="footer">
        <p>
          <span>Built by </span>
          <a href="https://github.com/oyyd/oyyd-blog">oyyd-blog</a>
          <span> and styled by </span>
          <a href="">tufte-css</a>
          <span>.</span>
        </p>
      </div>
    )
  }
});

export default SimpleApp;
