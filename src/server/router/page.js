// server
import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import getPostContent from '../getPostContent';
import { generateRouter } from '../../client/generateRoutes';
import createStore from '../../client/state/createStore';
import PostsData from '../../client/posts.data';
import { initPost } from '../../client/state/post/actions';
import { match, RouterContext } from 'react-router';
import escapeJSONString from '../utils/escapeJSONString';
import createPage from '../../template/createPage';

// TODO: a better 404 response
const NOT_FOUND_CONTENT = 'not found';

function transformPostsData(data) {
  const hash = {};
  let item;

  for (item of data) {
    hash[item.fileName] = item;
  }

  return hash;
}

const postsDataHash = transformPostsData(PostsData);

function updatePostStore(store, postData) {
  return new Promise((resolve, reject) => {
    getPostContent(postData.fileName).then(htmlContent => {
      const { title, fileName } = postData;

      try {
        store.dispatch(initPost(title, fileName, htmlContent));
      } catch (e) {
        reject(e);
      }

      resolve();
    });
  });
}

function internalErr(res, message) {
  return res.status(500).send(message);
}

function redirectReq(res, path) {
  return res.redirect(302, path);
}

function notFound(res) {
  return res.status(404).send(NOT_FOUND_CONTENT);
}

function renderPage(res, page) {
  return res.status(200).send(page);
}

function getPostPageContent(res, store, postData, props, next) {
  return updatePostStore(store, postData).then(() => {
    let initialState = null;

    try {
      initialState = escapeJSONString(JSON.stringify(store.getState()));
    } catch (err) {
      next(err);
      return;
    }

    next(null, createPage({
      initialState,
      title: postData.title,
      content: renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      ),
      description: postData.description,
    }));
  }, next).catch(next);
}

export default function getPageRender(callback, isPage, req, res) {
  const store = createStore({}, req.url);
  const routes = generateRouter(null);
  const fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
  const postData = postsDataHash[fileName];

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    let operator = null;

    if (error) {
      operator = internalErr.bind(null, res, error.message);
    } else if (redirectLocation) {
      operator = redirectReq.bind(null, res,
        `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (!renderProps || (!isPage && !postData)) {
      operator = notFound.bind(null, res);
    } else if (isPage) {
      operator = renderPage.bind(null, res, createPage({
        content: renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ),
        initialState: escapeJSONString(JSON.stringify(store)),
      }));
    }

    if (operator) {
      callback(operator);
      return;
    }

    operator = getPostPageContent(res, store, postData, renderProps, (err, pageContent) => {
      callback(err ? internalErr.bind(null, res, err.message)
        : renderPage.bind(null, res, pageContent));
    });
  });
}
