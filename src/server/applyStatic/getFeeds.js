import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

import moment from 'moment';
import RSS from 'rss';

import translate from '../../client/components/SimplePost/translate';
import posts from '../../client/posts.data';

const AUTHOR = 'oyyd';
const SITE_URL = 'https://blog.oyyd.net';
const FEED_URL = `${SITE_URL}/dist/feed.xml`;

const POST_PREFIX = path.resolve(process.cwd(), './posts');

function getPostUrl(fileName) {
  return `${SITE_URL}/post/${fileName}`;
}

function getPostContent(fileName) {
  const filePath = path.join(POST_PREFIX, fileName);
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}

export default function getContent() {
  const feed = new RSS({
    title: AUTHOR,

    // jscs:disable
    feed_url: FEED_URL,
    site_url: SITE_URL,
    // jscs:enable
  });

  posts.slice(0, 5).map((item) => {
    const content = getPostContent(`${item.fileName}.md`);
    const htmlContent = translate(content);

    const md5 = crypto.createHash('md5');
    const guid = md5.update(item.fileName).digest('hex');

    return {
      guid,
      title: item.title,
      description: htmlContent,
      url: getPostUrl(item.fileName),
      date: moment(item.publicDate, 'YYYY年MM月DD日'),
    };
  }).forEach((feedItem) => {
    feed.item(feedItem);
  });

  return feed.xml(true);
}
