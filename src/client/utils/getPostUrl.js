import CONSTANTS from '../CONSTANTS';

const { ORIGIN } = CONSTANTS.BLOG;

// TODO: it wold be pain when we change url
export default function getPostUrl(fileName) {
  return `${ORIGIN}/post/${fileName}`;
}
