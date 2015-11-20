// server
'use strict';
import fs from 'fs';
import path from 'path';

import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString, updatePath} from 'react-dom/server';

import createApp from '../../client/createApp';
import createStore from '../../client/state/createStore';
import PostsData from '../../client/posts.data';
import {match, RoutingContext} from 'react-router';

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
  const store = createStore();
  const app = createApp(store, 'server');
  match({routes: app, location: req.url},
    (error, redirectLocation, renderProps) => {
      console.log('renderProps', renderProps.components);

      // TODO: update app

      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        res.status(200).send(nunjucks.renderString(templateString, {
          content: renderToString(app),
        }));
      } else {
        res.status(404).send('Not found');
      }
    });

  // const fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
  // const postData = postsDataHash[fileName];

  // if (!postData) {
  //   res.status(404).send('404');
  //   return;
  // }

  // getPostContent(fileName).then(content => {
  //   res.status(200).send(nunjucks.renderString(templateString, {
  //     title: postData.title,
  //     content: renderToString(React.createElement(SimplePost, {
  //       content,
  //       params: {
  //         id: fileName,
  //       },
  //     })),
  //     description: postData.description,
  //   }));
  // }, err => {

  //   res.status(500).send(err.message);
  // });
}

export default pageRender;
