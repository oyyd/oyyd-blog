import React from 'react';
import posts from '../../posts.data';

let SimpleList = React.createClass({
  render(){
    return(
      <div className="blog-simple-list">
        <h2>Posts</h2>
        {posts.map((item, index)=>(
          <h3 key={item.title+item.publicDate}>
            <span className="public-date">{item.publicDate}</span>
            <a href={"/#/post/" + item.fileName}>{item.title}</a>
          </h3>
        ))}
      </div>
    )
  }
});

export default SimpleList;
