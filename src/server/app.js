'use strict';
import fs from 'fs';
import path from 'path';

import express from 'express';
import http from 'http';
import https from 'https';

import applyStatic from './applyStatic';
import router from './router';

const domain = 'blog.oyy.net';
const prefix = process.cwd();
const devPort = 80;
const proPort = 443;
const app = express();
let port = null;

// serve static files
applyStatic(app);

// page router
app.use('/', router);

let server = null;
if (process.argv[2] === 'dev') {
  port = devPort;
  server = http.createServer(app);
}else {
  const options = {
    cert: fs.readFileSync(`/etc/cert/${domain}.crt`),
    key: fs.readFileSync(`/etc/private/${domain}.key`),
  };
  port = proPort;
  server = https.createServer(options, app);
}

server.listen(port);

console.log(`server running on ${port}`);
