// server
import fs from 'fs';
import path from 'path';
import parsePost from './parsePost';

const prefix = process.cwd();

// TODO: `SimplePostsCache` will cost too much memory someday
// TODO: use redis or whatever
const SimplePostsCache = {};

function getPostContent(fileName) {
  return new Promise((resolve, reject) => {
    if (SimplePostsCache[fileName]) {
      resolve(SimplePostsCache[fileName]);
      return;
    }

    fs.readFile(
      path.join(prefix, 'posts', `${fileName}.md`), { encoding: 'utf8' }, (err, _data) => {
        if (err) {
          reject(err);
          return;
        }

        const data = parsePost(_data);

        SimplePostsCache[fileName] = data;
        resolve(data);
      });
  });
}

export default getPostContent;
