/* eslint-disable*/
const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const childProcess = require('child_process');

const configBrowserDEV = require('./webpack_config/browser.dev');
const configBrowserPRO = require('./webpack_config/browser.pro');
const configServerDEV = require('./webpack_config/server.dev');
const configServerPRO = require('./webpack_config/server.pro');

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    } else {
      // console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('backend-build', function(done) {
  webpack(configServerPRO).run(onBuild(done));
});

gulp.task('frontend-build', function(done) {
  webpack(configBrowserPRO).run(onBuild(done));
});

gulp.task('build', ['backend-build', 'frontend-build']);

gulp.task('backend-watch', function(done) {
  webpack(configServerDEV).run(onBuild(done));
});

// gulp.task('watch', ['backend-watch'], function(done) {
//   childProcess.
// });
