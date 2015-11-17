// server
'use strict';
import fs from 'fs';
import path from 'path';

import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';

import {match, RoutingContext} from 'react-router';
import generateRoutes from '../../client/generateRoutes';
import PostsData from '../../client/posts.data';

// const prefix = process.cwd();

// function getPostContent(fileName){
//   fs.readFile(path.join(prefix, 'posts', fileName+'.md'))
// }

function transformPostsData(data){
  const hash = {};

  for(let item of data){
    hash[item.fileName] = item;
  }
  return hash;
}

const templateString = fs.readFileSync('./template/page.html', {encoding: 'utf8'});
const routes = generateRoutes('server');
const postsDataHash = transformPostsData(PostsData);

function pageRender(req, res){
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
      const postData = postsDataHash[fileName];

      if(!postData){
        res.status(404).send('404');
        return;
      }

      res.status(200).send(nunjucks.renderString(templateString, {
        title: postData.title,
        content: renderToString(<RoutingContext {...renderProps}/>),
        description: postData.description,
      }));
    } else {
      res.status(404).send('Not found')
    }
  });
}

export default pageRender;
