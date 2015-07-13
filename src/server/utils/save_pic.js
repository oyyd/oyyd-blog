var fs = require('fs');
var path = require('path');
var extend = require('lodash').merge;

var request = require('request');
var lwip = require('lwip');
var mkdirp = require('mkdirp');
var moment = require('moment');

var options = {
  headers:{
    'Referer':'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=51182825'
  }
};

function getOption(url){
  return extend({url:url}, options);
};

var requestPic = function(url, cb){
  var name = url.slice(url.lastIndexOf('/') + 1);
  var fileExt = name.slice(name.lastIndexOf('.') + 1);
  var fileDir = path.join(__dirname, '../../../static/img' , moment().format('YYYY/MM/DD'));
  var filePath = path.join(fileDir, name);

  mkdirp(fileDir, function(err){
    if(err){
      cb(err);
      return;
    }
    var req = request(getOption(url)).pipe(fs.createWriteStream(filePath));
    req.on('close', function(){
      lwip.open(filePath, fileExt, function(err, image){
        if(err){
          cb(err);
          return;
        }
        image.batch()
          .blur(8)
          .writeFile(filePath, fileExt ,{
            quality: 50,
            compression: 'high'
          }, function(err){
            var url = filePath.slice(filePath.indexOf('/static'));
            console.log(filePath, url);
            cb(err, url);
          });
      });
    });
  });
};

var prefix = 'http://www.pixiv.net/ranking.php?date=';
var getPicPath = function(cb){
  // var dateString = timeFormat.date(new Date());
  // var url = prefix + dateString;
};

module.exports = requestPic;

if(require.main === module){
  requestPic('https://www.baidu.com/img/bd_logo1.png', function(){})
}