// server
'use strict';
import fs from 'fs';
import path from 'path';

import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';

// TODO: here we skip React Router and use SimplePost directly
// to pass post content in components, maybe we can use Redux
// to help us do someting like this
import SimplePost from '../../client/components/SimplePost';
import PostsData from '../../client/posts.data';

const prefix = process.cwd();

// TODO: `SimplePostsCache` will cost too much memory someday
// TODO: use redis or whatever
const SimplePostsCache = {};
function getPostContent(fileName) {
  return new Promise((resolve, reject) => {
    if (SimplePostsCache[fileName]) {
      resolve(SimplePostsCache[fileName]);
      return;
    }

    fs.readFile(path.join(prefix, 'dist/posts', fileName + '.html'), {encoding: 'utf8'}, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      SimplePostsCache[fileName] = data;
      resolve(data);
    });
  });
}

function transformPostsData(data) {
  const hash = {};

  for (let item of data) {
    hash[item.fileName] = item;
  }

  return hash;
}

const templateString = fs.readFileSync('./template/page.html', {encoding: 'utf8'});
const postsDataHash = transformPostsData(PostsData);

function pageRender(req, res) {
  const fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
  const postData = postsDataHash[fileName];

  if (!postData) {
    res.status(404).send('404');
    return;
  }

  getPostContent(fileName).then(content => {
    // try{
    //   console.log(renderToString(React.createElement(SimplePost, {
    //     content,
    //     params: {
    //       id: fileName,
    //     },
    //   })));
    // }catch(e){
    //   console.log(e.message);
    // }
    // TODO: mock params.id
    res.status(200).send(nunjucks.renderString(templateString, {
      title: postData.title,
      content: renderToString(React.createElement(SimplePost, {
        content,
        params: {
          id: fileName,
        },
      })),
      description: postData.description,
    }));
  }, err => {

    res.status(500).send(err.message);
  });
}

export default pageRender;
