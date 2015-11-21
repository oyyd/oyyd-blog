import path from 'path';

import express from 'express';
import compression from 'compression';

const prefix = process.cwd();

function applyStatic(app) {
  // show ownership to google webmaster tools
  app.get('/google38940b23fa0e04ca.html', express.static(path.join(prefix)));

  app.use('/dist', compression());
  app.use('/dist', express.static(path.join(prefix, './dist')));
  app.use('/static', compression());
  app.use('/static', express.static(path.join(prefix, './static')));
  app.use('/posts', compression());
  app.use('/posts', express.static(path.join(prefix, './posts')));
}

export default applyStatic;
