const React = require('react');
const {RouteHandler} = require('react-router');
const mui = require('material-ui');
const ThemeManager = new mui.Styles.ThemeManager();

// init react-tap-event-plugin
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const LeftNav = require('../LeftNav/LeftNav');

// App
var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  openLeftNav(){
    this.refs.leftNav.openNav();
  },
  render: function() {
    return (
      <div>
        <App.Header leftIconClicked={this.openLeftNav}/>
        <RouteHandler />
        <App.Footer />
        <LeftNav ref="leftNav" isOpen={false} />
      </div>
    );
  }
});

App.Header = React.createClass({
  leftIconClicked(){
    if(typeof this.props.leftIconClicked === 'function'){
      this.props.leftIconClicked();
    }
  },
  render(){
    return (
      <mui.AppBar onLeftIconButtonTouchTap={this.leftIconClicked} title='OYYD Blog亚东的(偏)技术博客'/>
    )
  }
});

App.Footer = React.createClass({
  render(){
    return (
      <div className="blog-Footer">
        <p><strong>@2015 oyyd Powered by <a href="#">oyyd-blog</a> And <a href="https://github.com/callemall/material-ui">material-ui</a>.</strong></p>
        <p>京ICP备14040206号</p>
      </div>
    )
  }
});

module.exports = App;