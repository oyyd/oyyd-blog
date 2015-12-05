import path from 'path';
import gulp from 'gulp';

import './gen-posts';

function watchPost() {
  gulp.watch(path.join(process.cwd(), 'posts/*.md'), ['gen-posts']);
}

gulp.task('watch-post', (cb) => {
  watchPost();
});

export default watchPost;
