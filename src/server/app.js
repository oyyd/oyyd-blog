var koa = require('koa');

var router = require('koa-router')();
var app = koa();

var staticMiddleware = require('./static');
var wordpressPost = require('./model/wordpress_post');

// static file
app.use(staticMiddleware);

// routes
router.get('/wordpress/post/title', function*(next){
  var that = this;

  yield function(cb){
    wordpressPost.db.findAll().then(function(posts){
      var titles = [];
      for(var i = 0; i < posts.length; i++){
        var post = posts[i].dataValues;
        if(wordpressPost.isPost(post)){
          titles.push({
            'title': post.postTitle,
            'id': post.id
          });
        }
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

router.post('/post', function*(next){
  console.log(this.body);
});

app.use(router.routes())
  .use(router.allowedMethods());

// listen
app.listen(8000);

console.log('Listen on port 8000');
