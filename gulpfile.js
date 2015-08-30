var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack');
var async = require('async');

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

gulp.task('webpack', ['gen-list'], function(callback){
  var task = exec('NODE_ENV=production webpack --progress --color', function(error, stdout, stderr){
    console.log(stdout);
  });
  task.on('close', function() {
    callback();
  });
});

gulp.task('gen-list', function(callback){

  function extractData(results){
    var pubReg = /\$publicdate\((.*?)\)/;
    var handledResult = [];
    for (var i in results){
      var item = results[i];
      // remove file extension
      item.fileName = item.fileName.slice(0, item.fileName.lastIndexOf('.md'));

      // get title
      var title = item.content.split('\n')[0];
      title = title.slice(1);
      item.title = title;

      // get public time
      var regRes = pubReg.exec(item.content);
      if(regRes){
        item.publicDate = regRes[1];
      }

      // delete content
      delete item.content;

      handledResult.push(item);
    }
    return handledResult;
  }

  function writeList(results, callback){
    var fileContent = 'export default ' + JSON.stringify(results);
    fs.writeFile(path.join(__dirname, 'src/client/posts.data.js'), fileContent, function(err){
      callback(err);
    });
  }

  var prefix = path.join(__dirname, '/posts');
  fs.readdir(prefix, function(err, files){
    if(err){
      console.log('err');
      return;
    }
    var result = null;
    async.map(files, function(item, cb){
      var filePath = path.join(prefix, item);
      fs.readFile(filePath, {encoding: 'utf8'}, function(err, data){
        if(err){
          cb(err);
          return;
        }
        cb(null, {
          fileName: item,
          content: data
        });
      });
    }, function(err, res){
      result = extractData(res);
      writeList(result, function(err){
        if(err){
          console.log('Err when writing the list file.');
        }
        callback();
      })
    });
  });
});

gulp.task('release', ['webpack', 'minify', 'gen-list']);
