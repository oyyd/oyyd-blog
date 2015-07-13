const router = require('koa-router')();
const moment = require('moment');

const post = require('../model/post');
const verify = require('../utils/verify');

const savePic = require('../utils/save_pic');

router.get('/post/title', function*(next){
  var titles = [];

  yield function(cb){
    post.db.findAll({
      attributes: ['id', 'title', 'tags', 'createdTime', 'picUrl']
    }).then(function(data){
      for(var i=0;i<data.length;i++){
        titles.push(data[i].dataValues);
        titles[i].createdTime = new Date(titles[i].createdTime).getTime();
      }
      cb();
    });
  };

  this.body = titles;

  yield next;
});

router.get('/post/:id', function*(next){
  var thePost = null;
  var id = this.params.id;

  yield function(cb){
    post.db.findOne({
      where:{
        id: id
      }
    }).then(function(data){
      if(data){
        thePost = data.dataValues;        
      }
      cb();
    });
  }

  this.body = thePost;
  yield next;
});

router.post('/post', function*(next){
  var params = this.request.body;
  if(!verify(params.key)){
    this.response.status = 403;
    return;
  }
  
  yield function(cb){
    if(params.id){
      // find and update
      post.db.findOne({
        where:{
          id: params.id
        }
      }).then(function(data){
        if(data){
          data.updateAttributes({
            title: params.title,
            content: params.content,
            tags: params.tags,
            picUrl: params.picUrl
          }).then(function(){
            cb();
          });
        }
      });
    }else{
      savePic(params.picUrl, function(err, url){
        if(err){
          console.log(err);
          cb(err);
          return;
        }
        // create
        post.db.create({
          title: params.title,
          content: params.content,
          tags: params.tags,
          picUrl: url,
          createdTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }).then(function(){
          cb();
        });
      });
    }
  };

  this.response.status = 200;
  yield next;
});

module.exports = router;
