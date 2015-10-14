var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var moment = require('moment');
var gulp = require('gulp');
var RSS = require('rss');
var async = require('async');

var cwd = process.cwd();
var translate = require(path.join(cwd, './src/client/components/SimplePost/translate.es5'));
var assign = require('lodash.assign');

var AUTHOR = 'oyyd';
var SITE_URL = 'http://blog.oyyd.net/';
var FEED_URL = SITE_URL + 'dist/feed.xml';

var validFields = {
  fileName: true,
  title: true,
  publicDate: true
};

function getPostUrl(fileName){
  return SITE_URL + '#/post/' + fileName;
}

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

    handledResult.push(item);
  }

  handledResult.sort(function(post1, post2){
    return moment(post1.publicDate, 'YYYY年MM月DD日').valueOf() <
       moment(post2.publicDate, 'YYYY年MM月DD日').valueOf();
  });
  return handledResult;
}

function writeListModule(results, callback){
  var listResults = results.map(function(item){
    var listItem = {};
    for(var key in item){
      if(item.hasOwnProperty(key) && (key in validFields)){
        listItem[key] = item[key];
      }
    }
    return listItem;
  });
  var fileContent = 'export default ' + JSON.stringify(listResults);
  fs.writeFile(path.join(cwd, 'src/client/posts.data.js'), fileContent, function(err){
    callback(err);
  });
}

function writeFeedFile(posts, callback){
  var feed = new RSS({
    title: AUTHOR,
    feed_url: FEED_URL,
    site_url: SITE_URL
  });

  posts.slice(0, 5).map(function(item){
    var md5 = crypto.createHash('md5');
    var guid = md5.update(item.fileName).digest('hex');
    return {
      title: item.title,
      description: translate(item.content),
      url: getPostUrl(item.fileName),
      guid: guid,
      date: moment(item.publicDate, 'YYYY年MM月DD日')
    }
  }).forEach(function(feedItem){
    feed.item(feedItem);
  });

  var xml = feed.xml(true);

  fs.writeFile(path.join(cwd, 'dist/feed.xml'), xml, function(err){
    callback(err);
  });
}

gulp.task('gen-list', function(taskCallback){
  var prefix = path.join(cwd, '/posts');
  fs.readdir(prefix, function(err, files){
    if(err){
      throw err;
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
      async.parallel([function(callback){
        writeListModule(result, function(err){
          callback(err);
        });
      }, function(callback){
        writeFeedFile(result, function(err){
          callback(err);
        });
      }], function(err){
        if(err){
          throw err;
        }
        taskCallback();
      });
    });
  });
});
