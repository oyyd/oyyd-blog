'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialPost = {
  title: null,
  fileName: null,
  htmlContent: null
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialPost : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'POST_INIT':
      return {
        title: action.title,
        fileName: action.fileName,
        htmlContent: action.htmlContent
      };
    default:
      return state;
  };
}

exports.default = reducer;