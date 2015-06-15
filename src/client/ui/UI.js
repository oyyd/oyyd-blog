const React = require('react');
const mui = require('material-ui');
const ThemeManager = new mui.Styles.ThemeManager();

var UI = {};

UI.FloatingActionButton = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    return (
      <mui.FloatingActionButton iconClassName="muidocs-icon-action-grade" />
    );
  }
});

module.exports = UI;