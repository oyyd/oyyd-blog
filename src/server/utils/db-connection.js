const Sequelize = require('sequelize');

const config = global.config.db;

var con = new Sequelize(config.dbName, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00'
});

module.exports = con;