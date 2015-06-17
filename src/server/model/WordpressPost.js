var Sequelize = require('sequelize');
var con = require('../db-connection');

var WordpressPost = con.define('wp_posts',{
  id:{
    type: Sequelize.BIGINT(20),
    field: 'ID'
  },
  postDate:{
    type: Sequelize.DATE,
    field: 'post_date'
  },
  postContent:{
    type: Sequelize.TEXT,
    field: 'post_content'
  },
  postTitle:{
    type: Sequelize.TEXT,
    field: 'post_title'
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = WordpressPost;