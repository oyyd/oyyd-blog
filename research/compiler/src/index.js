import getTokens from './getTokens';

function Compiler(src) {
  this.src = src;
}

Compiler.prototype.getNum = function() {

};

function getCode(src) {
  const compiler = new Compiler(src);
}

function main() {
  const testStr = ' .123 * 12.123 + 1 == 145';

  console.log(getTokens(testStr));

  // const compiledCode = getCode(testStr);
  //
  // console.log(eval(compiledCode));
}

main();
