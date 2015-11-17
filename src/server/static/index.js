import express from 'express';
import compression from 'compression';

function static(app){
  app.use('/dist', compression());
  app.use('/dist', express.static(path.join(prefix, './dist')));
  app.use('/static', compression());
  app.use('/static', express.static(path.join(prefix, './static')));
  app.use('/posts', compression());
  app.use('/posts', express.static(path.join(prefix, './posts')));
}

export default static;