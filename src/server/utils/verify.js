var verify = function(key){
  return (key === global.config.key);
};

module.exports = verify;