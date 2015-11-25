'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

require('./gen-posts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('watch-post', function (cb) {
  _gulp2.default.watch(_path2.default.join(process.cwd(), 'posts/*.md'), ['gen-posts']);
});