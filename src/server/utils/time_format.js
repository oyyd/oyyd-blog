var timeFormat = {};

timeFormat.date = function(date){
  if(!date instanceof Date){
    return ;
  }
  var month = date.getMonth() + 1;
  if(month < 10){
    month = '0' + month;
  }
  var day = date.getDate();
  if(day < 10){
    day = '0' + day;
  }
  return  '' + date.getFullYear() + month + day;
};

timeFormat.dateTime = function(date){
  if(!date instanceof Date){
    return ;
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' 
    + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};


module.exports = timeFormat;