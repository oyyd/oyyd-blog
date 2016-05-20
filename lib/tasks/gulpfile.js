'use strict';

var _path = require('path');

var _child_process = require('child_process');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpMinifyCss = require('gulp-minify-css');

var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);

require('./gen-posts');

require('./gen-list');

require('./gen-lib');

require('./gen-sitemap');

require('./watch-post');

require('./watch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = (0, _path.join)(process.cwd(), 'dist');

_gulp2.default.task('minifyJs', ['webpack'], function () {
  return _gulp2.default.src((0, _path.join)(path, '*.js')).pipe((0, _gulpUglify2.default)()).pipe(_gulp2.default.dest(path));
});

_gulp2.default.task('minifyCss', ['minifyJs'], function () {
  return _gulp2.default.src((0, _path.join)(path, '*.css')).pipe((0, _gulpMinifyCss2.default)()).pipe(_gulp2.default.dest(path));
});

_gulp2.default.task('webpack', ['gen-list'], function (callback) {
  (0, _child_process.exec)('webpack --progress --color', function (error, stdout /* , stderr */) {
    console.log(stdout); // eslint-disable-line
    if (error !== null) {
      console.log('ERROR', error.message); // eslint-disable-line
      return;
    }

    callback();
  });
});

_gulp2.default.task('release', ['webpack', 'minifyJs', 'gen-list', 'gen-lib', 'gen-sitemap', 'minifyCss', 'gen-posts']);