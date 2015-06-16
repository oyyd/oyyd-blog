const React = require('react');
const {RouteHandler} = require('react-router');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <App.Header />
        <RouteHandler />
        <App.Footer />
      </div>
    );
  }
});

App.Header = React.createClass({
  render(){
    return (
      <div>
        <h1>OYYD Blog</h1>
      </div>
    )
  }
});

App.Footer = React.createClass({
  render(){
    let styles = {
      textAlign: 'center'
    };
    return (
      <div style={styles}>
        <strong>@2015 oyyd</strong>
      </div>
    )
  }
});

module.exports = App;