const router = require('koa-router')();
const wordpressPost = require('../model/wordpress_post');

router.get('/wordpress/post/title', function*(next){
  var that = this;

  yield function(cb){
    wordpressPost.db.findAll({
      where:{
        postStatus: 'publish',
        postType: 'post'
      }
    }).then(function(posts){
      var titles = [];
      for(var i = 0; i < posts.length; i++){
        var post = posts[i].dataValues;
        titles.push({
          'title': post.postTitle,
          'id': post.id,
          'createdTime': post.postDate
        });
      }
      that.body = titles;
      cb();
    });
  };
});

router.get('/wordpress/post/:id', function*(next){
  var that = this;

  yield function(cb){
    wordpressPost.db.findOne({
      where: {
        id: that.params.id,
        postType: 'post'
      }
    }).then(function(post){
      if(post){
        that.body = post.dataValues; 
      }else{
        that.body = null;
      }
      cb();
    });
  };
});

module.exports = router;