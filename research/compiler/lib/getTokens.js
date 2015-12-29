'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var OPERATORS = ['+', '-', '*', '/', '='];
var DOT = '.';
var EQUAL = '=';
var WHITE_SPACE = ' ';

function fail(reason) {
  throw new Error(reason);
}

function isNum(char) {
  return !! ~NUMBERS.indexOf(char);
}

function isOperator(char) {
  return !! ~OPERATORS.indexOf(char);
}

function isDot(char) {
  return char === DOT;
}

function createNumNode(value) {
  return {
    type: 'NUMBER',
    value: value
  };
}

function createOperatorNode(value) {
  return {
    type: 'OPERATOR',
    value: value
  };
}

// const testStr = '12*12+ 1 == 145';
// getTokens(testStr) // -> ['12', '*', '12', '+', '1', '==', '145']

var Lexer = (function () {
  function Lexer(text) {
    _classCallCheck(this, Lexer);

    this.text = text;
    this.index = 0;
  }

  _createClass(Lexer, [{
    key: 'getTokens',
    value: function getTokens() {
      var tokens = [];

      var token = null;
      while (token = this.getToken()) {
        tokens.push(token);
      }

      return tokens;
    }
  }, {
    key: 'isFinished',
    value: function isFinished() {
      return this.index >= this.text.length;
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      var cur = this.getChar();
      while (cur === WHITE_SPACE) {
        this.forward();
        cur = this.getChar();
      }

      if (this.isFinished()) {
        return false;
      }

      if (isNum(cur) || isDot(cur)) {
        return this.getNumToken();
      } else if (isOperator(cur)) {
        return this.getOperatorToken();
      }
    }
  }, {
    key: 'forward',
    value: function forward(n) {
      if (!n) {
        n = 1;
      }

      this.index += n;
    }
  }, {
    key: 'getChar',
    value: function getChar() {
      return this.text[this.index];
    }
  }, {
    key: 'getNextChar',
    value: function getNextChar() {
      if (this.isFinished()) {
        return null;
      }

      return this.text[this.index + 1];
    }
  }, {
    key: 'getNextChar',
    value: function getNextChar() {
      // TODO: exceed
      return this.text[this.index + 1];
    }
  }, {
    key: 'getNumToken',
    value: function getNumToken() {
      var value = '';
      var hasDot = false;

      while (!this.isFinished()) {
        var cur = this.getChar();

        if (isNum(cur)) {
          value += cur;
          this.forward();
        } else if (isDot(cur)) {
          if (hasDot) {
            break;
          }

          hasDot = true;
          value += cur;
          this.forward();
        } else {
          break;
        }
      }

      return createNumNode(value);
    }
  }, {
    key: 'getOperatorToken',
    value: function getOperatorToken() {
      var value = '';
      var cur = this.getChar();

      if (cur === EQUAL) {
        var nextChar = this.getNextChar();
        if (nextChar === EQUAL) {
          this.forward(2);
          return createOperatorNode('' + EQUAL + EQUAL);
        } else {
          fail('invalid char "="');
        }
      } else {
        this.forward();
        return createOperatorNode(cur);
      }
    }
  }]);

  return Lexer;
})();

function getTokens(str) {
  var lexer = new Lexer(str);
  return lexer.getTokens();
}

exports.default = getTokens;