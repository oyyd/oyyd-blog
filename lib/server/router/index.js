'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _posts2 = require('./posts');

var _posts3 = _interopRequireDefault(_posts2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posts = _posts3.default.bind(null, function (response) {
  response();
});

var router = new _express2.default.Router();

router.get('/post/:name', posts);
router.use(_pages2.default);

exports.default = router;