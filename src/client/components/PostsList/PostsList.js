var React = require('react');

var PostsList = React.createClass({

  render: function() {
    return (
      <div>
        <PostLink linkRef="http://www.baidu.com" linkTitle="baidu" />
        <PostLink linkRef="http://bilibili.com" linkTitle="bilibili" />
      </div>
    );
  }

});

var PostLink = React.createClass({
  render: function(){
    return(
      <a href={this.props.linkRef}>{this.props.linkTitle}</a>
    );
  }
});

module.exports = PostsList;