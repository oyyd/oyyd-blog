var timeFormat = function(date){
  if(!date instanceof Date){
    return ;
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' 
    + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};

module.exports = timeFormat;