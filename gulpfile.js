var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');

gulp.task("webpack", function(callback) {
  webpack({
    entry: './es6/main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
  }, function(err, stats){
    if(err){
      console.log(err);
    }
    callback();
  });
});
