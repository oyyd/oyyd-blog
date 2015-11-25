import path from 'path';
import fs from 'fs';

import gulp from 'gulp';
import postsData from '../client/posts.data';
import translate from '../client/components/SimplePost/translate.es5';

const PREFIX = path.join(process.cwd(), 'posts');
const DIST_PREFIX = path.join(process.cwd(), 'dist/posts');

function createDirIfNotExist() {
  // TODO: a better way?
  try {
    const stats = fs.statSync(DIST_PREFIX);
  }catch (e) {
    fs.mkdir(DIST_PREFIX);
  }
}

function genPosts(done) {
  createDirIfNotExist();
  postsData.map(item => item.fileName).forEach(fileName => {
    const filePath = `${PREFIX}/${fileName}.md`;
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
    fs.writeFileSync(`${DIST_PREFIX}/${fileName}.html`, translate(fileContent));
  });

  done();
}

gulp.task('gen-posts', cb => {
  genPosts(cb);
});
