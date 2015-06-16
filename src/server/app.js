const koa = require('koa');

var router = require('koa-router')();
var app = koa();

router.get('/', function*(next){
  this.body = 'Hello World';
});

router.post('/post', function*(next){
  console.log(this.body);
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8000);

console.log('port 8000');