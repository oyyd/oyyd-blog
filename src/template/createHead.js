function createHead(ctx) {
  const { title, description } = ctx;

  return (
    `<head>
      <title>${title}</title>
      <meta name="description" content="${description}"/>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href="/static_lib/codemirror/codemirror.css"/>
      <link rel="stylesheet" href="/static_lib/codemirror/theme/monokai-sublime.css"/>
      <link rel="stylesheet" href="/dist/style.css"/>
    </head>`
  );
}

export default createHead;
