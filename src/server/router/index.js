import express from 'express';

import page from './page';

function response(res) {
  res();
}

const renderPost = page.bind(null, response, false);

const renderPage = page.bind(null, response, true);

const router = new express.Router();

router.get('/post/:name', renderPost);
router.use(renderPage);

export default router;
