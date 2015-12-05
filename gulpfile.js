var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack');

require('./lib/tasks/gen-posts');
require('./lib/tasks/gen-list');
require('./lib/tasks/gen-lib');
require('./lib/tasks/gen-sitemap');
require('./lib/tasks/watch-post');
require('./lib/tasks/watch');

gulp.task('minifyJs', ['webpack'], function(callback) {
  return gulp.src(path.join(__dirname, 'dist/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('minifyCss', ['minifyJs'], function(callback) {
  return gulp.src(path.join(__dirname, 'dist/*.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', ['gen-list'], function(callback) {
  var task = exec('webpack --progress --color', function(error, stdout, stderr) {
    console.log(stdout);
    if (error !== null) {
      console.log('ERROR', error.message);
      return;
    }

    callback();
  });
});

gulp.task('release', ['webpack', 'minifyJs', 'gen-list', 'gen-lib', 'gen-sitemap', 'minifyCss', 'gen-posts']);
