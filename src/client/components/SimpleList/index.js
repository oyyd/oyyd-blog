import React from 'react';
import posts from '../../posts.data';

let SimpleList = React.createClass({
  render(){
    return(
      <div className="blog-simple-list">
        <h2>Posts</h2>
        <ul>
        {posts.map((item, index)=>(
          <li key={index}>
            <h3>
              <span className="public-date">{item.publicDate}</span>
              <a href={"/#/post/" + item.fileName}>{item.title}</a>
            </h3>
          </li>
        ))}
        </ul>
      </div>
    )
  }
});

export default SimpleList;
