function createHead(ctx) {
  let {title, description} = ctx;

  return (
    `<head>
      <title>${title}</title>
      <meta name="description" content="${description}"/>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="/static-lib/codemirror/codemirror.css"/>
      <link rel="stylesheet" href="/static-lib/codemirror/theme/monokai-sublime.css"/>
      <link rel="stylesheet" href="/dist/style.css"/>
    </head>`
  );
}

export default createHead;
