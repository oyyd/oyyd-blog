"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createHead(ctx) {
  var title = ctx.title;
  var description = ctx.description;


  return "<head>\n      <title>" + title + "</title>\n      <meta name=\"description\" content=\"" + description + "\"/>\n      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n      <link rel=\"shortcut icon\" href=\"/static/favicon.ico\" />\n      <link rel=\"stylesheet\" href=\"/static-lib/codemirror/codemirror.css\"/>\n      <link rel=\"stylesheet\" href=\"/static-lib/codemirror/theme/monokai-sublime.css\"/>\n      <link rel=\"stylesheet\" href=\"/dist/style.css\"/>\n    </head>";
}

exports.default = createHead;