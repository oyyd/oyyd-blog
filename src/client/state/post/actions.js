export function initPost(title, fileName, htmlContent) {
  return {
    type: 'POST_INIT',
    title,
    fileName,
    htmlContent,
  };
}
