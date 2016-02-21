import React from 'react';
import ReactDON from 'react-dom';

import posts from '../../posts.data';
import Disqus from '../Disqus';

let SimpleList = React.createClass({
  render() {
    return (
      <div className='blog-simple-list region'>
        <h2 className='mdl-typography--display-1'>文章列表</h2>
        {posts.map((item, index)=>(
          <div className='post-item mdl-typography--title' key={item.title + item.publicDate}>
            <a className='title no-deco' href={'/post/' + item.fileName}>
              {item.title}
            </a>
            <p className='public-date'>
              {item.publicDate}
            </p>
            <p className='description'>
              {item.description}
            </p>
          </div>
        ))}
        <Disqus/>
      </div>
    );
  },
});

export default SimpleList;
