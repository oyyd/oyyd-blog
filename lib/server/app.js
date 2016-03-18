'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _applyStatic = require('./applyStatic');

var _applyStatic2 = _interopRequireDefault(_applyStatic);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domain = 'blog.oyyd.net';
var prefix = process.cwd();
var devPort = 80;
var proPort = 443;
var app = (0, _express2.default)();
var port = null;

// serve static files
(0, _applyStatic2.default)(app);

// page router
app.use('/', _router2.default);

var server = null;
if (process.argv[2] === 'dev') {
  port = devPort;
  server = _http2.default.createServer(app);
} else {
  var proxyUpgradeServer = (0, _express2.default)();
  proxyUpgradeServer.use('/', function (req, res) {
    res.redirect(301, 'https://' + domain);
  });
  proxyUpgradeServer.listen(80);

  var options = {
    cert: _fs2.default.readFileSync('/etc/ssl/certs/' + domain + '.crt'),
    key: _fs2.default.readFileSync('/etc/ssl/private/' + domain + '.key'),
    ca: _fs2.default.readFileSync('/etc/ssl/certs/starfield.pem')
  };
  port = proPort;
  server = _https2.default.createServer(options, app);
}

server.listen(port);

console.log('server running on ' + port);