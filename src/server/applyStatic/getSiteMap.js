// server
import sm from 'sitemap';

import CONSTANTS from '../../client/CONSTANTS';
import postData from '../../client/posts.data';

const hostname = CONSTANTS.BLOG.ORIGIN;
const staticPages = ['/', '/about'];
const postPages = postData.map(item => `/post/${item.fileName}`);

export default async function getSiteMap() {
  return new Promise((resolve, reject) => {
    const sitemap = sm.createSitemap({
      hostname,
      urls: staticPages.concat(postPages).map(url => ({
        url,
      })),
    });

    sitemap.toXML((err, xml) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(xml);
    });
  });
}
