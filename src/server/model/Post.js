var Sequelize = require('sequelize');
var con = require('../db-connection');

var Post = con.define('post', {
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

module.exports = Post;