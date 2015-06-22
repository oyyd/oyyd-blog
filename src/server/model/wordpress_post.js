var Sequelize = require('sequelize');
var con = require('../utils/db-connection');

var wordpressPost = {};
wordpressPost.db = con.define('wp_posts',{
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
  },
  postType:{
    type: Sequelize.STRING(20),
    field: 'post_type'
  },
  postStatus:{
    type: Sequelize.STRING(20),
    field: 'post_status'
  }
}, {
  freezeTableName: true,
  timestamps: false
});

wordpressPost.isPost = function(post){
  return (post.postType === 'post');
};

module.exports = wordpressPost;