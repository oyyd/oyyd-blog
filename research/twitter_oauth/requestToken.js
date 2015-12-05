'use strict';

const https = require('https');
const utf8 = require('utf8');
const base64 = require('base-64');

function rfc1738Encode(str) {
  return str;
}

function getCredentials(key, secret) {
  return `${key}:${secret}`;
}

function requestToken(tokenCredentials, cb) {
  const options = {
    hostname: 'api.twitter.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${tokenCredentials}`,
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
  req.write('grant_type=client_credentials');
  req.end();
}

const appInfo = {
  key: 'fo6PZ7wlgYDv1X5zVHnHg31Yl',
  secret: 'kRHMxlAF5HaA1enoaCvySjCALUFXlzlJMnWPIMkr3pudMg8Rnh',
};

const tokenCredentials = base64.encode(utf8.encode(getCredentials(
  rfc1738Encode(appInfo.key),
  rfc1738Encode(appInfo.secret)
)));

module.exports = requestToken.bind(this, tokenCredentials);
