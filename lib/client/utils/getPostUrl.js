'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPostUrl;

var _CONSTANTS = require('../CONSTANTS');

var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ORIGIN = _CONSTANTS2.default.BLOG.ORIGIN;

// TODO: it wold be pain when we change url

function getPostUrl(fileName) {
  return ORIGIN + '/post/' + fileName;
}