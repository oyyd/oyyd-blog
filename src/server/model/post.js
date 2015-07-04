const Sequelize = require('sequelize');
const con = require('../utils/db-connection');

var post = {};
post.db = con.define('post', {
  id: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING(255)
  },
  content: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.STRING(255)
  },
  createdTime: {
    type: Sequelize.DATE,
    field: 'created_time'
  },
  picUrl: {
    type: Sequelize.STRING(1000),
    field: 'pic_url'
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = post;