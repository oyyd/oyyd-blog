import { join } from 'path';

import express from 'express';
import compression from 'compression';
import getSiteMap from './getSiteMap';
import getFeeds from './getFeeds';
import applyDEVServer from './applyDEVServer';

const STATIC_PATHS =
  ['/dist', '/static', '/posts', '/static_lib'];
const prefix = process.cwd();

function applyPath(app, path) {
  app.use(path, compression());
  app.use(path, express.static(join(prefix, path)));
}

async function applyStatic(app) {
  const sitemap = await getSiteMap();
  const feed = getFeeds();

  const xmlList = {
    sitemap, feed,
  };

  // show the ownership to google webmaster tools
  app.get('/google38940b23fa0e04ca.html', express.static(join(prefix)));

  applyDEVServer(app);

  Object.keys(xmlList).forEach((name) => {
    app.get(`/dist/${name}.xml`, (req, res) => {
      res.set('Content-Type', 'text/xml');
      res.send(xmlList[name]);
    });
  });

  STATIC_PATHS.forEach(path => applyPath(app, path));
}

export default applyStatic;
