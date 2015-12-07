import createHead from './createHead';

function createPage(ctx) {
  let {title, description, content, initialState} = ctx;

  title = title || 'oyyd blog';
  description = description || '这是亚东的博客，你可以在上面看到我的一些想法和实践，欢迎来访。';
  initialState = initialState || 'null';

  return (
    `<!DOCTYPE html>
    <html>
      ${createHead({title, description})}
      <body>
        <div id="main">${content}</div>
        <script>
          window.__INITIAL_STATE__ = JSON.parse("${initialState}");
        </script>
        <script src="/static-lib/codemirror/codemirror.js"></script>
        <script src="/static-lib/codemirror/mode/javascript/javascript.js"></script>
        <script src="/static-lib/codemirror/mode/xml/xml.js"></script>
        <script src="/dist/bundle.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-70462946-1', 'auto');
          ga('send', 'pageview');
        </script>
      </body>
    </html>`
  );
}

export default page;
