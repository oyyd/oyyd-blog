'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createHead = require('./createHead');

var _createHead2 = _interopRequireDefault(_createHead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPage(ctx) {
  var title = ctx.title;
  var description = ctx.description;
  var content = ctx.content;
  var initialState = ctx.initialState;


  title = title || 'oyyd blog';
  description = description || '这是亚东的博客，你可以在上面看到我的一些想法和实践，欢迎来访。';
  initialState = initialState || 'null';

  return '<!DOCTYPE html>\n    <html>\n      ' + (0, _createHead2.default)({ title: title, description: description }) + '\n      <body>\n        <div id="main">' + content + '</div>\n        <script>\n          window.__INITIAL_STATE__ = JSON.parse("' + initialState + '");\n        </script>\n        <script src="/static-lib/codemirror/codemirror.js"></script>\n        <script src="/static-lib/codemirror/mode/javascript/javascript.js"></script>\n        <script src="/static-lib/codemirror/mode/xml/xml.js"></script>\n        <script src="/dist/bundle.js"></script>\n        <script>\n          (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n          })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n\n          ga(\'create\', \'UA-70462946-1\', \'auto\');\n          ga(\'send\', \'pageview\');\n        </script>\n      </body>\n    </html>';
}

exports.default = createPage;