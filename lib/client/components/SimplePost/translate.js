'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _markedChartjsBinding = require('marked-chartjs-binding');

function initCommands() {
  var commands = [];

  commands.push({
    reg: /\$sidenote\((.*?)\)/,
    handler: function () {
      var sideNoteCount = 0;
      return function (content) {
        sideNoteCount++;
        return '<sup id="' + sideNoteCount + '" class="margin-toggle' + (' sidenote-number">' + sideNoteCount + '</sup>') + ('<span for="' + sideNoteCount + '" class="mdl-tooltip sidenote">' + content + '</span> ');
      };
    }()
  });

  commands.push({
    reg: /\$publicdate\((.*?)\)/,
    handler: function handler(content) {
      return content;
    }
  });

  return commands;
}

function translate(content) {
  var commands = initCommands();

  var result = (0, _markedChartjsBinding.marked)(content);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var command = _step.value;

      var regResult = command.reg.exec(result);
      while (regResult) {
        var match = regResult[0];
        var text = regResult[1];
        result = result.replace(match, command.handler(text));
        regResult = command.reg.exec(result);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

exports.default = translate;