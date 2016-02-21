// server
'use strict';
import fs from 'fs';
import path from 'path';

import React from 'react';
import {renderToString, updatePath} from 'react-dom/server';

import {Provider} from 'react-redux';
import getPostContent from '../getPostContent';
import generateRoutes from '../../client/generateRoutes';
import createStore from '../../client/state/createStore';
import PostsData from '../../client/posts.data';
import {initPost} from '../../client/state/post/actions';
import {match, RouterContext} from 'react-router';
import escapeJSONString from '../utils/escapeJSONString';
import createPage from '../../template/createPage';

// TODO: a better 404 response
const NOT_FOUND_CONTENT = 'not found';
const prefix = process.cwd();

function transformPostsData(data) {
  const hash = {};

  for (let item of data) {
    hash[item.fileName] = item;
  }

  return hash;
}

const postsDataHash = transformPostsData(PostsData);

function updatePostStore(store, postData) {
  return new Promise((resolve, reject) => {
    getPostContent(postData.fileName).then(htmlContent => {
      const {title, fileName} = postData;
      try {
        store.dispatch(initPost(title, fileName, htmlContent));
      }catch (e) {
        reject(e);
      }

      resolve();
    });
  });
}

function pageRender(req, res) {
  const store = createStore({}, req.url);
  const routes = generateRoutes(null);

  match({routes: routes, location: req.url},
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
        const postData = postsDataHash[fileName];

        if (!postData) {
          res.status(404).send(NOT_FOUND_CONTENT);
          return;
        }

        updatePostStore(store, postData).then(() => {
          res.status(200).send(createPage({
            title: postData.title,
            content: renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            ),
            description: postData.description,
            initialState: escapeJSONString(JSON.stringify(store.getState())),
          }));
        }, err => {

          res.status(500).send(err.message);
        });
      } else {
        res.status(404).send(NOT_FOUND_CONTENT);
      }
    });
}

export default pageRender;
