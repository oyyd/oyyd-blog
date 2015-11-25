import path from 'path';
import gulp from 'gulp';

import './gen-posts';

gulp.task('watch-post', (cb) => {
  gulp.watch(path.join(process.cwd(), 'posts/*.md'), ['gen-posts']);
});
