var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var moment = require('moment');
var gulp = require('gulp');
var RSS = require('rss');
var async = require('async');

var cwd = process.cwd();
var translate = require(path.join(cwd, './lib/client/components/SimplePost/translate')).default;
var metaData = require(path.join(cwd, './lib/client/posts.data')).default;
var assign = require('lodash.assign');

var AUTHOR = 'oyyd';
var SITE_URL = 'https://blog.oyyd.net';
var FEED_URL = SITE_URL + 'dist/feed.xml';

require('./gen-lib');

var validFields = {
  fileName: true,
  title: true,
  publicDate: true,
};

function getPostUrl(fileName) {
  return SITE_URL + '/post/' + fileName;
}

function getPostContent(fileName) {
  const filePath = path.join(cwd, 'posts', fileName);
  return fs.readFileSync(filePath, {encoding: 'utf8'});
}

function writeFeedFile(posts, callback) {
  const feed = new RSS({
    title: AUTHOR,

    // jscs:disable
    feed_url: FEED_URL,
    site_url: SITE_URL,
    // jscs:enable
  });

  posts.slice(0, 5).map(function(item) {
    const content = getPostContent(item.fileName + '.md');
    const htmlContent = translate(content);

    var md5 = crypto.createHash('md5');
    var guid = md5.update(item.fileName).digest('hex');
    return {
      title: item.title,
      description: htmlContent,
      url: getPostUrl(item.fileName),
      guid: guid,
      date: moment(item.publicDate, 'YYYY年MM月DD日'),
    };
  }).forEach(function(feedItem) {
    feed.item(feedItem);
  });

  var xml = feed.xml(true);

  fs.writeFile(path.join(cwd, 'dist/feed.xml'), xml, function(err) {
    callback(err);
  });
}

gulp.task('gen-list', ['gen-lib'], function(taskCallback) {
  writeFeedFile(metaData, taskCallback);
});
