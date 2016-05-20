import path from 'path';
import { exec } from 'child_process';

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import minifyCSS from 'gulp-minify-css';

import './gen-posts';
import './gen-list';
import './gen-lib';
import './gen-sitemap';
import './watch-post';
import './watch';

gulp.task('minifyJs', ['webpack'], () => gulp.src(path.join(__dirname, 'dist/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/')));

gulp.task('minifyCss', ['minifyJs'], () => gulp.src(path.join(__dirname, 'dist/*.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/')));

gulp.task('webpack', ['gen-list'], callback => {
  exec('webpack --progress --color', (error, stdout /* , stderr */) => {
    console.log(stdout); // eslint-disable-line
    if (error !== null) {
      console.log('ERROR', error.message); // eslint-disable-line
      return;
    }

    callback();
  });
});

gulp.task(
  'release',
  ['webpack', 'minifyJs', 'gen-list', 'gen-lib', 'gen-sitemap', 'minifyCss', 'gen-posts']
);
