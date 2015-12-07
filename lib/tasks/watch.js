'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _watchPost = require('./watch-post');

var _watchPost2 = _interopRequireDefault(_watchPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = _child_process2.default.exec;

var watchLibCmd = 'babel src -w --out-dir lib';
var watchBundleCmd = 'webpack --watch --progress --colors';

function startTask(command) {
  var child = exec(command, function (error, stdout, stderr) {
    if (err) {
      console.log(err);
    }
  });

  child.stdout.on('data', function (data) {
    console.log(data);
  });
}

_gulp2.default.task('watch', function (callback) {
  startTask(watchLibCmd);
  startTask(watchBundleCmd);
  (0, _watchPost2.default)();
});