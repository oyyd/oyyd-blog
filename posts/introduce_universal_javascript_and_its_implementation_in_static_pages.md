# Universal(Isomorphic) JavaScript在React上的应用
$publicdate(2015年11月4日)

// TODO:
React中的renderToString方法允许我们在服务器上渲染React部件，这在扩展了React的使用方式的同时，还可以帮助我们解决会出现在单页应用上一些缺点。

## 什么是Universal Javascript？

Universal Javascript又称Isomorphic JavaScript$sidenote([名称来由](https://medium.com/@mjackson/universal-javascript-4761051b7ae9))，是指可以运行在客户端和服务器上的javascript代码。$sidenote([http://isomorphic.net](http://isomorphic.net/))

实现Universal Javascript的原理并不复杂，我们只需要在代码中获取当前环境（是在浏览器还是服务器上运行？），并根据环境作出不同响应即可。比如在[Meteor](https://www.meteor.com/)中，你会看到这样的代码出现在同一个文件中：

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

像是原来的blog.oyyd.net是用React + React Router写的SPA(单页)应用，一开始的页面内容是这样的：

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
上面的内容基本没有有效的html标签，这就会产生一些__问题__：

1. 用户在脚本加载运行之前是不会看到React部分的内容，从体验上来讲好像等待了更多的时间（特别是在网速差的时候）。

2. 如果javascrript加载失败或是运行时产生错误的话（或是浏览器直接禁用了javascript的话），用户看不到任何内容。

3. 搜索引擎无法有效地爬取页面内容$sidenote(对于google而言有一些[解决办法](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started))，难以进行SEO。

对于这些问题，我们可以利用Universal JavaScript来在服务器上渲染React应用中的内容，从而解决这些问题。

## 实现

现在的blog.oyyd.net就充分利用了React中的`renderToString`。你可以在浏览器中查看源码来查看这个网站现在的状况。下面还是让我们通过一个更加简洁的例子来直击问题的重点：

> 注意：下面的代码并不完备，由于build过程相对繁杂多样，所以这些代码只是为了让我们能更好地关注这一流程中的重点步骤。

假设我们要实现一个简单的计数器，注意这里重要的一点是我们会在服务器端设置计数器的初始值。

其实现的思路大致如下：

1. 请求到来，服务器初始化React应用，并将其渲染成字符串。

2. 把React生成的字符串放到模板中，生成完整的HTML内容返回给浏览器。

3. 在浏览器初始化React应用。

我们的React计数器代码如下：

```js
// Counter.js
import React from 'react';

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }
  countPlusOne(){
    this.setState({
      count: this.state.count + 1,
    });
  }
  render(){
    return (
      <div>
        <label>数值: {this.state.count}</label>
        <button onClick={this.countPlusOne.bind(this)}>+1</button>
      </div>
    )
  }
}

export default Counter;
```

当请求来临时，express根据参数设置初始状态生成一个Counter的ReactElement,并将其渲染成字符串：

```js
// server.js
import fs from 'fs';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import Counter from './components/Counter';

const app = express();
app.get('/:initialCount', (req, res) => {
  const {initialCount} = req.params;

  // 生成Counter实例的字符串
  const counterString = renderToString(
    <Counter initialCount={initialCount}/>
  );

  // 注意下面不仅将Counter的字符串放入了html内容中，并且
  // 还将参数保存在了全局浏览器上的全局变量`__INITIAL_COUNT__`
  req.send(`
    <html>
      <head></head>
      <body>
        <div id="main">${counterString}</div>
        <script src="/bundle.js"></script>
        <script>
          window.__INITIAL_COUNT__ = ${initialCount};
        </script>
        <script src="/bootstrap.js"></script>
      </body>
    </html>
  `);
});

app.listen(8080);
```

当浏览器上的请求从服务器上返回时，bootstrap.js脚本被加载运行，在浏览器上初始化完整的React应用：

// TODO:确认“需要传状态给浏览器”。

```js
// bootstrap.js
React.render(
  <Counter initialCount={window.__INITIAL_COUNT__}/>,
  document.getElementById('main')
);
```

到这里，我们的计数器应用就顺利地加载在了浏览器上，并且这一次，我们的页面一开始不会像SPA应用那样空空如也。

这一过程就像是我们的React应用的初始化过程被分成了两次进行。先是在服务器上，我们初始化了React应用中的HTML的内容，并发送到前端；然后浏览器接过了这些内容，继续进行DOM事件绑定等工作。而值得注意的是，为了能在前端以正确的初始状态启动应用，我们需要把我们应用的状态（上面例子中的`window.__INITIAL_COUNT__`）也一并传过去，用于初始化。

## React + Universal JavaScript还有更多潜力

### 1. 替代服务器端模板引擎。

如果你回想一下这一过程，你可能会注意到这一流程中React承担起了在服务器上本应由模板引擎处理的(template engine)大部分工作。

// TODO: 图来解释这一流程

如果你写过服务器端模板，同时也很熟悉React，那你可能会和我有同样的感受：React中的模板（或者说是jsx）用起来甚至比专业的模板引擎更加顺手。我想其原因在于：使用模板引擎意味着你在用一门模板语言和javascript交互；而React本身就是javascript，jsx本质也是javascript，所以React中的“模板”用起来要自然得多。

事实上如果你只希望把React作为服务器上的模板引擎的话，现在已经有[express-react-views](https://github.com/reactjs/express-react-views)这样的库来实现这一目的。但如果你的目的是Universal JavaScript应用的话，到这个时间点恐怕还没有。举个例子，到目前为止，redux

### 2. 减少不必要的请求（需要redux配合？）。

## 一个简单的benchmark

## 其他web前端框架中server render

1. ember

2. angular

## 结论

## 相关链接

StrongLoop的教程: [How to Implement Node + React Isomorphic JavaScript & Why it Matters](https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/)

[React Redux Universal Hot Example](https://github.com/erikras/react-redux-universal-hot-example)