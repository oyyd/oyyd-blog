// server
import fs from 'fs';
import path from 'path';

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
      path.join(prefix, 'dist/posts', `${fileName}.html`),
      { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        SimplePostsCache[fileName] = data;
        resolve(data);
      });
  });
}

export default getPostContent;
