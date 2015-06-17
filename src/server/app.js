const koa = require('koa');

var router = require('koa-router')();
var app = koa();

var WordpressPost = require('./model/WordpressPost');

router.get('/', function*(next){
  this.body = 'Hello World';
});

router.get('/old_blog/post', function*(next){
  var that = this;
  WordpressPost.findAll().then(function(posts){
    this.body = JSON.stringify(posts[0].dataValues);
  });
  yield* function*(){
    this.body = '234';
  }
});

router.post('/post', function*(next){
  console.log(this.body);
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8000);

console.log('port 8000');