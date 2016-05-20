'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _posts = require('../client/posts.data');

var _posts2 = _interopRequireDefault(_posts);

var _translate = require('../client/components/SimplePost/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = _path2.default.join(process.cwd(), 'posts');
var DIST_PREFIX = _path2.default.join(process.cwd(), 'dist/posts');

function createDirIfNotExist() {
  // TODO: a better way?
  try {
    var stats = _fs2.default.statSync(DIST_PREFIX);
  } catch (e) {
    _fs2.default.mkdir(DIST_PREFIX);
  }
}

function genPosts(done) {
  createDirIfNotExist();
  _posts2.default.map(function (item) {
    return item.fileName;
  }).forEach(function (fileName) {
    var filePath = PREFIX + '/' + fileName + '.md';
    var fileContent = _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
    _fs2.default.writeFileSync(DIST_PREFIX + '/' + fileName + '.html', (0, _translate2.default)(fileContent));
  });

  done();
}

_gulp2.default.task('gen-posts', function (cb) {
  genPosts(cb);
});