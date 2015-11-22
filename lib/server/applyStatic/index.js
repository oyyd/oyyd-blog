'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = process.cwd();

function applyStatic(app) {
  // show ownership to google webmaster tools
  app.get('/google38940b23fa0e04ca.html', _express2.default.static(_path2.default.join(prefix)));

  app.use('/dist', (0, _compression2.default)());
  app.use('/dist', _express2.default.static(_path2.default.join(prefix, './dist')));
  app.use('/static', (0, _compression2.default)());
  app.use('/static', _express2.default.static(_path2.default.join(prefix, './static')));
  app.use('/posts', (0, _compression2.default)());
  app.use('/posts', _express2.default.static(_path2.default.join(prefix, './posts')));
}

exports.default = applyStatic;