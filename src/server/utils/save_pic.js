var fs = require('fs');
var path = require('path');

var request = require('request');
var lwip = require('lwip');
var timeFormat = require('./time_format');

var savePic = function(url, cb){
  var name = url.slice(url.lastIndexOf('/') + 1);
  var fileExt = name.slice(name.lastIndexOf('.') + 1);
  var filePath = path.join(__dirname, '../../../test' , name);

  request(url, {encoding: 'binary'}, function(error, response, body){
    fs.writeFile(filePath, body, 'binary', function (err) {
      lwip.open(filePath, fileExt, function(err, image){
        if(err){
          console.log(err);
        }
        image.batch()
          .blur(8)
          .writeFile(filePath, fileExt ,{
            quality: 50,
            compression: 'high'
          }, function(err){
            if(err){
              console.log(err);
            }else{
              console.log('success');
            }
            cb();
          });
      });
    });
  });
};

var prefix = 'http://www.pixiv.net/ranking.php?date=';
var getPicPath = function(cb){
  var dateString = timeFormat.date(new Date());
  var url = prefix + dateString;
};

module.exports = savePic;

//test
var testPic = 'http://i4.pixiv.net/c/600x600/img-master/img/2015/07/05/00/21/06/51245691_p0_master1200.jpg';
// if(require.main === module){
//   savePic(testPic, function(err){
//     console.log('done', err);
//   });
// }
// request.get(testPic).pipe(fs.createWriteStream('doodle.jpg'));