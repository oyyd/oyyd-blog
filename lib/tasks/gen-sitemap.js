'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _sitemap = require('sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _CONSTANTS = require('../client/CONSTANTS');

var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

var _posts = require('../client/posts.data');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server

var hostname = _CONSTANTS2.default.BLOG.ORIGIN;
var staticPages = ['/', '/about'];
var postPages = _posts2.default.map(function (item) {
  return '/post/' + item.fileName;
});

require('./gen-lib');

_gulp2.default.task('gen-sitemap', ['gen-lib'], function (cb) {
  var sitemap = _sitemap2.default.createSitemap({
    hostname: hostname,
    urls: staticPages.concat(postPages).map(function (url) {
      return {
        url: url
      };
    })
  });

  sitemap.toXML(function (err, xml) {
    if (err) {
      throw err;
      return;
    }

    _fs2.default.writeFile(_path2.default.join(process.cwd(), 'dist/sitemap.xml'), xml, function (err) {
      if (err) {
        throw err;
        return;
      }

      cb();
    });
  });
});