var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

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

gulp.task('minify', ['webpack'], function(){
  gulp.src(path.join(__dirname, 'dist/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
  gulp.src(path.join(__dirname, 'dist/*.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', function(callback){
  var task = exec('NODE_ENV=production webpack --progress --color', function(error, stdout, stderr){
    console.log(stdout);
  });
  task.on('close', function() {
    callback();
  });  
});

gulp.task('gen-list', function(callback){
  fs.readdir(path.join(__dirname, '/posts'), function(err, files){
    if(err){
      console.log('err');
      return;
    }

    console.log(files);
  });
});

gulp.task('release', ['webpack', 'minify', 'gen-list']);
