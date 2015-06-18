var koa = require('koa');

var router = require('koa-router')();
var app = koa();

var wordpressPost = require('./model/wordpressPost');

router.get('/', function*(next){
  this.body = 'Hello World';
});

router.get('/old_blog/post/title', function*(next){
  var that = this;

  yield function(cb){
    wordpressPost.db.findAll().then(function(posts){
      var titles = [];
      for(var i = 0; i < posts.length; i++){
        var post = posts[i].dataValues;
        if(wordpressPost.isPost(post)){
          titles.push(post.postTitle)          
        }
      }
      that.body = titles;
      cb();
    });
  };
});

router.get('/old_blog/post/:id', function*(next){
  var that = this;

  yield function(cb){
    wordpressPost.db.findOne({
      where: {
        id: that.params.id,
        postType: 'post'
      }
    }).then(function(post){
      that.body = (!!post)?post.dataValues:{};
      cb();
    });
  };
});

router.post('/post', function*(next){
  console.log(this.body);
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8000);

console.log('port 8000!');
