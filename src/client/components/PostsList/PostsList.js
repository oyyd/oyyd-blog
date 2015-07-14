const React = require('react');
const mui = require('material-ui');
const $ = require('jquery');

var PostsList = React.createClass({
  getInitialState(){
    return {
      titles: null
    }
  },
  componentDidMount(){
    $.get('/post/title').done(function(titles){
      titles.reverse();
      this.setState({
        titles: titles
      });
    }.bind(this));
  },
  render() {
    if(this.state.titles){
      return (
        <div className="blog-PostList">
          <h1 className="title">Posts</h1>
          <div>
            {this.state.titles.map(function(item){
              return <PostLink key={item.id} createdTime={item.createdTime}
                linkRef={"/#/post/" + item.id}  linkTitle={item.title} tags={item.tags}
                picUrl={item.picUrl}/>
            })}
          </div>
        </div>
      );      
    }else{
      return (
        <div className="blog-PostList">
          <mui.CircularProgress mode="indeterminate" />
        </div>
      );
    }
  }
});

var PostLink = React.createClass({
  getInitialState(){
    return{
      depth: 1
    }
  },
  moveUp(){
    this.setState({
      depth: 3
    });
  },
  moveBack(){
    this.setState({
      depth: 1
    });
  },
  redirectTo(){
    location.href = this.props.linkRef;
  },
  renderTags(){
    if(!this.props.tags){
      return;
    }
    var tags = this.props.tags.split('|');
    return(
      tags.map(function(item){
        return (<span>{item}</span>)
      })
    )
  },
  render: function(){
    var style = {
      backgroundImage: 'url('+this.props.picUrl+')',
      backgroundSize: '100%'
    };
    return(
      <mui.Paper onMouseEnter={this.moveUp} onMouseLeave={this.moveBack}
        className="blog-PostLink" onClick={this.redirectTo} zDepth={this.state.depth}
        style={style}>
        <h1 className="title">{this.props.linkTitle}</h1>
        {this.renderTags()}
        <p>{new Date(this.props.createdTime).toString()}</p>
      </mui.Paper>
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
          return <PostLink key={item.id} createdTime={item.createdTime}
            linkRef={"/#/post/wordpress/" + item.id + '/'} linkTitle={item.title}></PostLink>
        })}
      </div>
    );
  }
});

module.exports = PostsList;