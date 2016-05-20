'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _watchPost = require('./watch-post');

var _watchPost2 = _interopRequireDefault(_watchPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = _child_process2.default.exec;

var watchBundleCmd = 'webpack --watch --progress --colors';
var watchLibCmd = 'babel src --out-dir lib -w';
var cwd = process.cwd();

function startTask(command) {
  var child = exec(command, { cwd: cwd }, function (error /* , stdout, stderr*/) {
    if (error) {
      console.log(err); // eslint-disable-line
    }
  });

  child.stdout.on('data', function (data) {
    console.log(data); // eslint-disable-line
  });
}

_gulp2.default.task('watch', function () {
  startTask(watchBundleCmd);
  startTask(watchLibCmd);
  (0, _watchPost2.default)();
});