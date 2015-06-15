var React = require('react');

var ErrorPage = React.createClass({
  getDefaultProps(){
    return {
      errorCode: 404
    }
  },
  render: function() {
    return (
      <div>{this.props.errorCode}</div>
    );
  }
});

module.exports = ErrorPage;