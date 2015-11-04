import React from 'react';
import ReactDON from 'react-dom';

import posts from '../../posts.data';
import Disqus from '../Disqus';

let SimpleList = React.createClass({
  render(){
    return(
      <div className="blog-simple-list">
        <h2>Posts</h2>
        {posts.map((item, index)=>(
          <h3 className="post-item" key={item.title+item.publicDate}>
            <span className="public-date">{item.publicDate}</span>
            <a href={"/#/post/" + item.fileName}>{item.title}</a>
          </h3>
        ))}
        <Disqus/>
      </div>
    )
  }
});

export default SimpleList;
