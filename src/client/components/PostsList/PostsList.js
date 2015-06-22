var React = require('react');
var $ = require('jquery');

var PostsList = React.createClass({
  getInitialState(){
    return {
      titles: []
    }
  },
  componentDidMount(){
    $.get('/post/title').done(function(titles){
      console.log(titles);
      this.setState({
        titles: titles
      });
    }.bind(this));
  },
  render() {
    return (
      <div className="blog-PostList">
        {this.state.titles.map(function(item){
          return <PostLink linkRef={"/#/post/" + item.id}  linkTitle={item.title} />
        })}
      </div>
    );
  }
});

var PostLink = React.createClass({
  render: function(){
    return(
      <a href={this.props.linkRef} className="blog-PostLink">{this.props.linkTitle}</a>
    );
  }
});

PostsList.Wordpress = React.createClass({
  getInitialState(){
    return {
      list: []
    };
  },
  componentDidMount(){
    $.get('/wordpress/post/title').done(function(data){
      this.setState({
        list: data
      });
    }.bind(this));
  },
  render(){
    return (
      <div className="blog-PostList">
        {this.state.list.map(function(item){
          return <PostLink key={item.id} linkRef={"/#/post/wordpress/" + item.id + '/'} linkTitle={item.title}></PostLink>
        })}
      </div>
    );
  }
});

module.exports = PostsList;