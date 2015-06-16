var Sequelize = require('sequelize');
var con = new Sequelize('test', 'root', '107room', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = con;