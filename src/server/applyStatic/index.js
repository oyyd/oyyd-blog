import { join } from 'path';

import express from 'express';
import compression from 'compression';

const STATIC_PATHS =
  ['/dist', '/static', '/posts', '/static-lib'];
const prefix = process.cwd();

function applyPath(app, path) {
  app.use(path, compression());
  app.use(path, express.static(join(prefix, path)));
}

function applyStatic(app) {
  // show the ownership to google webmaster tools
  app.get('/google38940b23fa0e04ca.html', express.static(join(prefix)));

  STATIC_PATHS.forEach(path => applyPath(app, path));
}

export default applyStatic;
