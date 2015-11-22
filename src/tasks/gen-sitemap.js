// server
import fs from 'fs';
import path from 'path';

import gulp from 'gulp';
import sm from 'sitemap';

import CONSTANTS from '../client/CONSTANTS';
import postData from '../client/posts.data';

const hostname = CONSTANTS.BLOG.ORIGIN;
const staticPages = ['/', '/about'];
const postPages = postData.map(item => `/post/${item.fileName}`);

require('./gen-lib');

gulp.task('gen-sitemap', ['gen-lib'],  cb => {
  const sitemap = sm.createSitemap({
    hostname,
    urls: staticPages.concat(postPages).map(url => ({
      url,
    })),
  });

  sitemap.toXML((err, xml) => {
    if (err) {
      throw err;
      return;
    }

    fs.writeFile(path.join(process.cwd(), 'dist/sitemap.xml'), xml, err => {
      if (err) {
        throw err;
        return;
      }

      cb();
    });
  });
});
