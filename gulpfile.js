var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack');
var path = require('path');

gulp.task('webpack', function(callback) {
  webpack({
    entry: './src/client/entry.js',
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'),
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

gulp.task('minify', ['webpack'], function(){
  return gulp.src(path.join(__dirname, 'dist/client/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/client'));
});

gulp.task('build', ['webpack', 'minify']);