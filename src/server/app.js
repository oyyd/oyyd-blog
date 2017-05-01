import express from 'express';
import http from 'http';

import applyStatic from './applyStatic';
import router from './router';

const port = 8001;
const app = express();

function applyHSTS(application) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  application.use('/', (req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    return next();
  });
}

async function main() {
  // serve static files
  await applyStatic(app);

  // hsts
  applyHSTS(app);

  // page router
  app.use('/', router);

  let server = null;

  server = http.createServer(app);

  server.listen(port);

  console.log(`server running on ${port}`); // eslint-disable-line
}

main().catch((err) => {
  setTimeout(() => {
    throw err;
  });
});
