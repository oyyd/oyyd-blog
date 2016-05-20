"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function escape(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return strings.map(function (str, index) {
    return index === 0 ? "" + str : "" + str + escape(values[index - 1]);
  }).join();
}

exports.default = escape;