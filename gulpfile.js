var path = require('path');

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack');

gulp.task('pack', function(callback) {
  webpack({
    entry: './src/client/bootstrap.js',
    output: {
        path: path.join(__dirname, 'dist/client'),
        filename: 'bundle.js'
    },
    module: {
      loaders: [{ 
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader' 
      }]
    }
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery'
    //   })
    // ]
  }, function(err, stats){
    if(err){
      console.log(err);
    }else{
      callback();      
    }
  });
});

gulp.task('pack-style', function(callback){
  return gulp.src(path.join(__dirname, 'src/client/style.less'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.join(__dirname, 'dist/client')));
});

gulp.task('minify', ['pack'], function(){
  return gulp.src(path.join(__dirname, 'dist/client/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/client'));
});

gulp.task('watch', function(){
  watch(path.join(__dirname, 'src/client/**/*.js'), function(){
    gulp.run(['pack']);
  });
  watch(path.join(__dirname, 'src/client/**/*.less'), function(){
    gulp.run(['pack-style']);
  });
});

gulp.task('build', ['webpack', 'minify']);
