'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isBrowser() {
  return typeof window !== 'undefined';
}

exports.default = isBrowser;