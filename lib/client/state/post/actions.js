'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPost = initPost;
function initPost(title, fileName, htmlContent) {
  return {
    type: 'POST_INIT',
    title: title,
    fileName: fileName,
    htmlContent: htmlContent
  };
}