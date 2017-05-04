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
      <script type='text/javascript'>
        var _vds = _vds || [];
        window._vds = _vds;
        (function(){
          _vds.push(['setAccountId', '8c5fbd1440d378e5']);
          (function() {
            var vds = document.createElement('script');
            vds.type='text/javascript';
            vds.async = true;
            vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(vds, s);
          })();
        })();
      </script>
    </head>`
  );
}

export default createHead;
