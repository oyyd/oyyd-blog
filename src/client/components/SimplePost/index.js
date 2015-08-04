import React from 'react';
import {State} from 'react-router';
import marked from 'marked';
import $ from 'jquery';

let SimplePost = React.createClass({
  mixins:[State],
  getInitialState(){
    return{
      content: ''
    }
  },
  componentDidMount(){
    $.get('./index.html').done((data)=>{
      this.setState({
        content: '```\n'+ data + '```\n'
      });
    });
  },
  render(){
    return(
      <div ref="content">{this.state.content}</div>
    )
  }
});

export default SimplePost;
