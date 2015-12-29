'use strict';

var _getTokens = require('./getTokens');

var _getTokens2 = _interopRequireDefault(_getTokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Compiler(src) {
  this.src = src;
}

Compiler.prototype.getNum = function () {};

function getCode(src) {
  var compiler = new Compiler(src);
}

function main() {
  var testStr = ' .123 * 12.123 + 1 == 145';

  console.log((0, _getTokens2.default)(testStr));

  // const compiledCode = getCode(testStr);
  //
  // console.log(eval(compiledCode));
}

main();