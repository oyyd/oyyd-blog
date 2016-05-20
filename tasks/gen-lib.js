'use strict';

const path = require('path');
const fs = require('fs');

const prefix = process.cwd();
const join = path.join;

const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');

let config = fs.readFileSync(join(prefix, '.babelrc'), {encoding: 'utf8'});
config = JSON.parse(config);

gulp.task('del-lib', () => {
  return del([join(prefix, 'lib/*'), `!${join(prefix, 'lib', 'tasks')}`]);
});

gulp.task('gen-lib', ['del-lib'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel(config))
    .pipe(gulp.dest('lib'));
});
