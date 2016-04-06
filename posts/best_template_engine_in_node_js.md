# 探究用ES6 template strings替代前后端模板引擎

__补充：__ 后来我发现我的想法有些接近[artTemplate](https://github.com/aui/artTemplate)的想法，感兴趣的朋友值得一试。

__前言：__

JavaScript上有很多的模板引擎，不管是用于前端的、后端的、两者兼顾的，或是特性丰富的，或是在模板中尽可能减少逻辑的，选择十分丰富。如果你也曾在一个或大或小的项目中考虑如何选择模板引擎的话，那你肯定也和我一样犹豫过要怎么选择。

另一方面，在我大量使用React的工作时间中，我越发认可React中jsx的设计$sidenote([JSX: E4X The Good Parts](http://blog.vjeux.com/2013/javascript/jsx-e4x-the-good-parts.html))。而当我从React jsx的角度考虑一个好的模板引擎应该具有什么样的特性时，我意识到，对于比较简单的情形，使用ES6中的[template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)外加一些约定就已经足矣。你甚至不需要模板引擎就能够很好地处理绝大多数你以前需要用模板引擎来处理的工作。

那么下面就让我们来简单地探讨一下用ES6 template strings替代模板引擎的可行性及其优劣。

## 一个简单的实例

像是我的这个博客的一部分模板工作是直接利用template strings完成的（剩下的是React renderToString完成的）：

head标签的模板:

```js
// createHead.js
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
```

使用head标签模板，并引入每个页面的具体内容：

```js
// createPage.js
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

export default createPage;
```

这样，我们就在没有引入模板引擎的情况下，完成了这些简单的工作。

## 对比实现其他模板引擎中的一些API与特性

为了进一步探讨用template strings替代模板引擎的可行性，我们将对比实现其他模板引擎中的一些特性。

这里我们挑选的是[nunjucks](http://mozilla.github.io/nunjucks/templating.html)中的一些特性，因其特性相对强大，更容易帮助我们说明template strings的特点及局限性。

另外，如果有些什么是template strings没有，而其他模板引擎做得到的话，你可以考虑用其他javascript的方式来实现，毕竟 __你可以直接使用javascript这一强大的语言环境，通常再写一个函数/模板都能解决你的问题__。并且相比于评价其好坏，你可能更需要去思考一下你是否真的需要这一特性。

### 表达式

nunjucks:

```html
{{ numItems*2 }}
```

template strings本身接受的就是表达式：

```js
`
${ numItems * 2 }
`
```

### if else

nunjucks中的条件语句十分灵活：

```html
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
```

因为template strings只接受表达式的值，所以你最多只能用boolean-exp：

```js
`
${ hungry ? (
  I am hungry
) : (
  I am not hungry
) }
`
```

### for

假设我们有：
```js
var points = [[0, 1, 2], [5, 6, 7], [12, 13, 14]];
```

在nunjucks中的：

```html
{% for x, y, z in points %}
  Point: {{ x }}, {{ y }}, {{ z }}
{% endfor %}
```

虽然template strings只接受表达式，但还是可以这样完成实现:

```js
`${points.map(({x, y, z}) => (
  `Point: ${x}, ${y}, ${z}`
)).join('')}`
```

### 异步操作asyncEach与asyncAll

nunjucks支持一些异步操作：

```html
<h1>Posts</h1>
<ul>
{% asyncAll item in items %}
  <li>{{ item.id | lookup }}</li>
{% endall %}
</ul>
```

我们没办法直接在template strings中做这件事。但如果只是进行简单的异步操作的话，我们可以在外部进行处理，并且这和其他用javascript处理异步操作的情况一致：

```js
function renderPosts(posts) {
  return new Promise((resolve, reject) => {
    let content = '';

    // 写些异步操作来修改content
    // ...

    resolve(`
      <h1>Posts</h1>
      <ul>
        ${content}
      </ul>
    `);
  });
}
```

但如果想要我们的模板整体支持异步的话，我们就需要写一些额外的代码来做这件事。而避免在你的模板中使用异步操作也是个选择。

### Autoescaping

在nunjucks中，当`autoescape`选项被设置为`true`时，nunjucks会默认地转义变量的值，以防止可能来自用户的攻击。在使用template strings时，我们不难转义单个变量的值：

```js
var username = '<script></script>';

function escapeHTML(str) {
  // 具体实现，或是直接使用lodash.escape等
}

return `<div>{ escapeHTML(username) }</div>`;
// <div>&lt;script&gt;&lt;&#x2F;script&gt;</div>
```

而如果我们不想每次都手动调用转义函数，而是想要默认转义所有变量的值的话，我们可以利用[Tagged template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Tagged_template_strings)这一特性：

```js
function escapeHTML(str) {
  // 具体实现，或是直接使用lodash.escape等
}

function escape(strings, ...values) {
  return strings.map((str, index) => (
    index === 0 ? `${str}` : `${str}${escapeHTML(values[index - 1])}`
  )).join('');
}

return escape`<div>{ uesrname }</div>`;
// <div>&lt;script&gt;&lt;&#x2F;script&gt;</div>
```

Tagged template strings这一特性很强大，你需要去充分利用它$sidenote(Tagged templates invite library designers to create powerful domain-specific languages. ——[ES6 In Depth: Template strings](https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/))。

### comments

在nunjucks中我们可以写注释：

```html
{# Loop through all the users #}
{% for user in users %}...{% endfor %}
```

并且模板中的注释在生成的字符串中会被自动截掉。如果我们想在template strings中写注释的话，我们就需要直接写成HTML的注释：

```js
`
<!-- Loop through all the users -->
`
```

那么我们能否在模板生成的字符串中自动截取掉这些注释呢？那我们还是要利用tagged template strings：

```js
function trimComments(str) {
  return str.replace(/<!--.*?-->/g, '');
}

function escape(strings, ...values) {
  return strings.map((str, index) => (
    index === 0 ? `${trimComments(str)}` : `${trimComments(str)}${trimComments(values[index - 1])}`
  )).join('');
}

return escape`
  <!-- Loop through all the users -->
`;
```

### 动态生成模板

大部分模板引擎都可以动态生成模板，因为生成模板的过程实际上是在js上进行的一次编译过程，比如在nunjucks中：

```js
var username = 'James';
var template = 'Hello {{ username }}';
var res = nunjucks.renderString(template, { username: username });
```

我们可以通过eval方法来动态生成模板：

```js
var username = 'James';
var template = '`Hello ${ username }`';
// 你应该需要更稳健的写法
var res = eval(template);
```

## 用template strings替代模板引擎的优点和缺点

到目前位置，我们主要讨论了用template strings来替代模板引擎的可行性，下面我们会讨论这样做的优点和缺点。

模板引擎是[DSL](https://en.wikipedia.org/wiki/Domain-specific_language)，其目的是拼接字符串。没有模板引擎我们当然也可以拼接字符串，只不过这一过程会很痛苦。而template strings本身就是为了解决这一问题而设计的，而tagged template strings又足够帮助我们实现模板引擎的功能$sidenote(利用tagged template strings开发DSL当然也是可行的，这里的讨论不涉及开发DSL的情况)。

由于各种原因，通常模板引擎在处理很多问题时，通常会有自己的一套方法，比如说在一个模板中引入另一个模板你可能需要用import/require/partials语句，这实际上和JavaScript本身的import解决的是相似的问题。所以在使用template strings时，面对这些情况，我们就可以直接利用JavaScript中的特性来实现，而不需要像那样用一套新的东西来解决相似的问题。

这样很自然地，使用template strings替代模板引擎最主要的优点在于：

1. 贴近原生JavaScript，学习曲线更低。

2. 你可以充分利用已有的JavaScript代码和特性，任何新的需求都可以通过你熟悉的JavaScript进行拓展。

3. 你的模板部分的内容天然就是Universal JavaScript，你天然地就可以同时在浏览器上和服务器上使用模板相关的代码。

但模板引擎毕竟是专门为处理模板而生的，有些用JavaScript实现比较麻烦的场景，用模板引擎的语法可能可以轻松地解决。实际上这里的讨论更像是在讨论使用DSL的优缺点。但使用template strings的理由在于 __很多模板引擎上的很多特性都和JavaScript（ES6+）本身的特性重合了，我们没必要用一套新东西解决同样的问题__。当然在ES6之前，JavaScript本身也没有模块，更别说考虑直接使用JavaScript中的特性来解决模板上的问题。

而另一个推荐使用template strings的原因在于Universal JavaScript。如果模板本身就是JavaScript代码的话，那么在前后端同时使用一份代码会变得容易得多。

另外不分离模板与代码的这一想主要是受到React的启发。React中的HTML(Virtual DOM, React DOM)部分和JavaScript代码紧密贴合$sidenote(这里主要是对比Angular和Polymer等框架，即主要由JavaScript代码控制HTML内容，而不是以HTML为主，也不是HTML和JavaScript平分秋色)的想法，至少从实践角度上来说是很有效的，它使得代码十分容易维护。那么对于模板来说，不去刻意分离模板代码与普通的代码、模板代码既是JavaScript代码或许是个好的思路。

## 生产环境上的应用

在生产环境上单单使用template strings没办法解决我们的所有需求，而截止至本文时点我也没有看见过任何类似的实现。所以如果你觉得这是个好主意，你需要充分利用tagged template strings这一特性来组织起模板层。万幸的是这一过程不需要涉及编译，所以这会远比重新写一个模板引擎要简单得多。之后我也会尝试写一个帮助实现这一目的的库。

## 其他相关链接

[HTML templating with ES6 template strings](http://www.2ality.com/2015/01/template-strings-html.html)
