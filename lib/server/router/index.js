'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function response(res) {
  res();
}

var renderPost = _page2.default.bind(null, response, false);

var renderPage = _page2.default.bind(null, response, true);

var router = new _express2.default.Router();

router.get('/post/:name', renderPost);
router.use(renderPage);

exports.default = router;