const send = require('koa-send');
const path = require('path');

const prefix = path.join(__dirname, '../../');

var staticMiddleware = function*(next){
  // index file
  if(this.path === '/' || this.path === ''){
    yield send(this, path.join(prefix, 'index.html'));
  // dist files and static files
  }else if(this.path.indexOf('/dist/client') === 0 || this.path.indexOf('/static') === 0){
    yield send(this, path.join(prefix, this.path));
  }else{
    yield next;
  }
};

module.exports = staticMiddleware;