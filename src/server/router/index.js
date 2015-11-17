import express from 'express';

import pages from './pages';
import posts from './posts';

const router = express.Router();

router.get('/post/:name', posts);
router.use(pages);

export default router;
