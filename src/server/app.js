const fs = require('fs');
const path = require('path');

const koa = require('koa');
const app = koa();

const bodyParser = require('koa-bodyparser');

const staticMiddleware = require('./static');

// get global config
try{
  var str = fs.readFileSync(path.join(__dirname, '/config.json'));
  global.config = JSON.parse(str);
}catch(e){
  console.log('Invalid config.json file content, will exit.');
  return;
}

// static file
app.use(staticMiddleware);

// body parser
app.use(bodyParser());

// reads all routes
var apiPath = path.join(__dirname , '/api/');
var routes = fs.readdirSync(apiPath);
for(var i = 0;i<routes.length;i++){
  var router = require(path.join(apiPath, routes[i]));
  app.use(router.routes())
    .use(router.allowedMethods());
}

if(process.env.NODE_ENV === 'production'){
  var options = {
    key: fs.readFileSync('/etc/ssl/private/oyyd.net.key'),
    cert: fs.readFileSync('/etc/ssl/certs/oyyd.net.crt')
  };

  require('https').createServer(options, app.callback()).listen(443);
  console.log('Listen on port 443');
}else{
  app.listen(80);
  console.log('Listen on port 80');  
}
