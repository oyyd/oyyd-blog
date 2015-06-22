const React = require('react');
const $ = require('jquery');

var PostUploader = React.createClass({
  getInitialState(){
    return {
      id: null,
      title: '',
      content: '',
      tags: ''
    };
  },
  componentDidMount(){
    if(this.props.params.id){
      $.get('post/' + this.props.params.id).done(function(data){
        if(data){
          this.setState({
            id: data.id,
            title: data.title,
            content: data.content,
            tags: data.tags
          }, function(){
            React.findDOMNode(this.refs.title).value = this.state.title;
            React.findDOMNode(this.refs.content).value = this.state.content;
            React.findDOMNode(this.refs.tags).value = this.state.tags;
          });
        }
      }.bind(this));
    }
  },
  uploadPost(){
    let data = {
      id: this.state.id,
      title : React.findDOMNode(this.refs.title).value,
      content : React.findDOMNode(this.refs.content).value,
      tags: React.findDOMNode(this.refs.tags).value,
      key: React.findDOMNode(this.refs.key).value
    };
    if(!data.title || !data.content || !data.tags || !data.key){
      alert('invalid form');
      return;
    }
    
    $.post('/post', data).done(function(){
      alert('done');
    });
  },
  render(){
    return (
      <div>
        <div>
          <label>Title</label>
          <input ref="title" type="text"/>
        </div>
        <div>
          <label>Content</label>
          <textarea ref="content"/>
        </div>
        <div>
          <label>Tags(lowcase, seperated by "|")</label>
          <input ref="tags" type="text"/>
        </div>
        <div>
          <label>Key</label>
          <input ref="key" type="text"/>
        </div>
        <div>
          <button onClick={this.uploadPost}>Submit</button>
        </div>
      </div>
    )
  }
});

module.exports = PostUploader;