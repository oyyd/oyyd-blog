# Universal(Isomorphic) JavaScript在React上的应用
$publicdate(2015年11月4日)

## 什么是Universal Javascript？

Universal Javascript又称Isomorphic JavaScript$sidenote([名称来由](https://medium.com/@mjackson/universal-javascript-4761051b7ae9))，是指可以运行在客户端和服务器上的javascript代码。$sidenote([http://isomorphic.net](http://isomorphic.net/))

Universal Javascript的原理实际上非常简单，比如在[Meteor](https://www.meteor.com/)中，你会看到这样的代码出现在同一个文件中：

```js
if (Meteor.isServer) {
  // This code only runs on the server
}

if (Meteor.isClient) {
  // This code only runs on the client
}
```

只要通过`Meteor.isServer`和`Meteor.isClient`，我们就能够控制代码在不同环境下要执行的部分，从而使得这份代码可以同时在客户端和服务器上执行，并根据环境返回对应的结果。

## Universal JavaScript可以给React应用带来什么？

那么对于React来讲，Universal Javascript又有什么用呢?我们知道，html标签加载了一部分就会显示一部分； 而React是通过javascript来渲染html内容的，而这也就意味着应用完成加载并运行脚本之前，React应用的html内容是不会出现在页面上的。

像是blog.oyyd.net是用React + React Router写的，一开始的页面内容是这样的：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>oyyd blog - 这是亚东的博客（偏技术），你可以在上面看到我的一些想法和实践，欢迎来访。</title>
    <meta charset="utf-8"/>
    <meta name="description=" content="内容偏前端，但不局限于前端，没准你会感兴趣。"/>
    <link rel="stylesheet" href="/dist/style.css"/>
  </head>
  <body>
    <div id="main"></div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```
上面的内容基本没有有效的html标签，这就会产生__一些问题__：

1. 用户在脚本加载运行之前是不会看到React部分的内容，从体验上来讲好像等待了更多的时间（特别是在网速差的时候）。

2. 搜索引擎无法有效地爬取页面内容$sidenote(对于google而言有一些[解决办法](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started))，难以进行SEO。

对于这些问题，我们可以利用Universal JavaScript来在服务器上渲染React应用中的内容，从而解决这些问题。

## 实现

这个网站的[About](http://blog.oyyd.net/about)页面的实现便是一个非常简洁的例子，其实现的思路大致如下：

1. 生成初始状态下的React应用的html字符串。

2. 配合模板引擎ejs生成完整的html内容。

3. 在前端启动React应用。



如果你在找更适合用在生产环境上的做法，可以查看下面StrongLoop的教程。

## React + Universal JavaScript还有更多潜力

好处：

1. 替代模板引擎。

2. 减少ajax请求（需要redux配合？）。


## 相关链接

StrongLoop: [How to Implement Node + React Isomorphic JavaScript & Why it Matters](https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/)
