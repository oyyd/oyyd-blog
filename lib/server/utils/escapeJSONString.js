'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function escapeJSONString(string) {
  return string.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\\"').replace(/[\/]/g, '\\/').replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t');
}

exports.default = escapeJSONString;