var Sequelize = require('sequelize');
var con = require('../db-connection');

var post.db = con.define('post', {
  title:{
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true
});

module.exports = post;