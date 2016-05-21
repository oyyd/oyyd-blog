'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server


var prefix = process.cwd();

// TODO: `SimplePostsCache` will cost too much memory someday
// TODO: use redis or whatever
var SimplePostsCache = {};

function getPostContent(fileName) {
  return new Promise(function (resolve, reject) {
    if (SimplePostsCache[fileName]) {
      resolve(SimplePostsCache[fileName]);
      return;
    }

    _fs2.default.readFile(_path2.default.join(prefix, 'dist/posts', fileName + '.html'), { encoding: 'utf8' }, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      SimplePostsCache[fileName] = data;
      resolve(data);
    });
  });
}

exports.default = getPostContent;