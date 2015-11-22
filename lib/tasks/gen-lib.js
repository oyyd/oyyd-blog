'use strict';

var path = require('path');
var fs = require('fs');

var prefix = process.cwd();
var join = path.join;

var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');

var config = fs.readFileSync(join(prefix, '.babelrc'), { encoding: 'utf8' });
config = JSON.parse(config);

gulp.task('del-lib', function () {
  return del([join(prefix, 'lib')]);
});

gulp.task('gen-lib', ['del-lib'], function () {
  return gulp.src('src/**/*.js').pipe(babel(config)).pipe(gulp.dest('lib'));
});