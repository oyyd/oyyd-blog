'use strict';

const fs = require('fs');
const https = require('https');
const requestToken = require('./requestToken');

function requestTimeLine(accessToken, cb) {
  const options = {
    hostname: 'api.twitter.com',
    path: '/1.1/statuses/user_timeline.json?count=1&screen_name=jdalton',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let body = '';
  const req = https.request(options, res => {
    res.on('data', data => {
      body += data.toString();
    });

    res.on('end', () => {
      let response;

      try {
        response = JSON.parse(body);
      } catch (e) {
        cb(e);
        return;
      }

      cb(null, response);
    });
  });

  req.on('error', cb);
  req.end();
}

requestToken((err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // jscs:disable
  let accessToken = data.access_token;
  // jscs:enable

  requestTimeLine(accessToken, (err, data) => {
    fs.writeFileSync('./tweets', JSON.stringify(data));
  });
});
