const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['+', '-', '*', '/', '='];
const DOT = '.';
const EQUAL = '=';
const WHITE_SPACE = ' ';

function fail(reason) {
  throw new Error(reason);
}

function isNum(char) {
  return !!~NUMBERS.indexOf(char);
}

function isOperator(char) {
  return !!~OPERATORS.indexOf(char);
}

function isDot(char) {
  return char === DOT;
}

function createNumNode(value) {
  return {
    type: 'NUMBER',
    value,
  };
}

function createOperatorNode(value) {
  return {
    type: 'OPERATOR',
    value,
  };
}

// const testStr = '12*12+ 1 == 145';
// getTokens(testStr) // -> ['12', '*', '12', '+', '1', '==', '145']

class Lexer {
  constructor(text) {
    this.text = text;
    this.index = 0;
  }

  getTokens() {
    const tokens = [];

    let token = null;
    while (token = this.getToken()) {
      tokens.push(token);
    }

    return tokens;
  }

  isFinished() {
    return this.index >= this.text.length;
  }

  getToken() {
    let cur = this.getChar();
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

  forward(n) {
    if (!n) {
      n = 1;
    }

    this.index += n;
  }

  getChar() {
    return this.text[this.index];
  }

  getNextChar() {
    if (this.isFinished()) {
      return null;
    }

    return this.text[this.index + 1];
  }

  getNextChar() {
    // TODO: exceed
    return this.text[this.index + 1];
  }

  getNumToken() {
    let value = '';
    let hasDot = false;

    while (!this.isFinished()) {
      let cur = this.getChar();

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

  getOperatorToken() {
    let value = '';
    let cur = this.getChar();

    if (cur === EQUAL) {
      let nextChar = this.getNextChar();
      if (nextChar === EQUAL) {
        this.forward(2);
        return createOperatorNode(`${EQUAL}${EQUAL}`);
      } else {
        fail('invalid char "="');
      }
    } else {
      this.forward();
      return createOperatorNode(cur);
    }
  }
}

function getTokens(str) {
  const lexer = new Lexer(str);
  return lexer.getTokens();
}

export default getTokens;
