var fs = require('fs');
var path = require('path');

var request = require('request');
var lwip = require('lwip');
var timeFormat = require('./time_format');

var savePic = function(url, cb){
  var name = url.slice(url.lastIndexOf('/') + 1);
  var fileExt = url.slice(name.lastIndexOf('.') + 1);
  var filePath = path.join(__dirname, '../../../test' , name);
  var task = request({
    uri: url,
    'multipart/related': {
      chuncked: true,
      data: []
    }
  }, function(e, r, chunk){
    lwip.open()
  });
  // task.on('end', function(){
  //   console.log('end');
  //   lwip.open(filePath, function(err, image){
  //     console.log('get');
  //     image.batch()
  //       .blur(3)
  //       .writeFile(filePath, fileExt ,{
  //         quality: 50,
  //         compression: 'high'
  //       }, function(err){
  //         if(err){
  //           console.log(err);
  //         }else{
  //           console.log('success');
  //         }
  //         cb();
  //       });
  //   });
  // });
};

var prefix = 'http://www.pixiv.net/ranking.php?date=';
var getPicPath = function(cb){
  var dateString = timeFormat.date(new Date());
  var url = prefix + dateString;
};

module.exports = savePic;

//test
var testPic = 'https://www.baidu.com/img/bd_logo1.png';
if(require.main === module){
  savePic(testPic, function(err){
    console.log('done', err);
  });
}