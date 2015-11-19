import path from 'path';

import express from 'express';
import https from 'https';

import applyStatic from './applyStatic';
import router from './router';

const prefix = process.cwd();
const port = 80;
const app = express();

// serve static files
applyStatic(app);

// page router
app.use('/', router);

app.listen(port);
console.log(`server running on ${port}`);
