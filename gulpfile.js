var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack');

var tasks = [];
var runTask = function(taskName){
  var task = tasks[taskName];
  if(task){
    task.kill('SIGHUP');
  }

  task = spawn('gulp', [taskName]);
  task.stdout.on('data', function(data){
    console.log(data.toString());
  });
  task.stderr.on('data', function(data){
    console.log(data.toString());
  });
  task.on('close', function(){
    task = null;
  });
};

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
    },
    bail: true
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
  var pack = null;
  var packStyle = null;
  watch(path.join(__dirname, 'src/client/**/*.js'), function(){
    runTask('pack');
  });
  watch(path.join(__dirname, 'src/client/**/*.less'), function(){
    runTask('pack-style');
  });
});

gulp.task('build', ['webpack', 'minify']);
