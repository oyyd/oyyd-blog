import express from 'express';

import pages from './pages';
import _posts from './posts';

const posts = _posts.bind(null, response => {
  response();
});

const router = new express.Router();

router.get('/post/:name', posts);
router.use(pages);

export default router;
