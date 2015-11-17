import path from 'path';

import express from 'express';

import static from './static';
import router from './router';

const prefix = process.cwd();
const port = 80;
const app = express();

// serve static files
static(app);

// page router
app.use('/', router);

app.listen(port);
console.log(`server running on ${port}`);
