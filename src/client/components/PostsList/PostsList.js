var React = require('react');
var $ = require('jquery');

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

var PostsList.OldPosts = React.createClass({
  getDefaultProps(){
    $.post('/old_blog/post/title').done(function(){

    });
  },
  render(){
    return (
      <div></div>
    );
  }
});

module.exports = PostsList;