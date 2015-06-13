var React = require('react');

var ErrorPage = React.createClass({
  render: function() {
    let errorCode = this.props.errorCode;
    if(!errorCode){
      errorCode = 404;
    }
    return (
      <div>{errorCode}</div>
    );
  }
});

module.exports = ErrorPage;