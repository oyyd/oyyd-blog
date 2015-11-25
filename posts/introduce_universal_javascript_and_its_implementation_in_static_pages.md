# Universal(Isomorphic) JavaScript在React上的应用
$publicdate(2015年11月4日)

React中的renderToString方法允许我们在服务器上渲染React部件，这不仅允许我们将React用作模板引擎（template engine），还可以帮助我们解决会出现在单页应用(SPA)上一些问题。下文还附带一个简单的benchmark来衡量其性能...

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

> 注意：下面的代码并不完备，由于构建过程相对繁杂多样，所以这些代码只是为了让我们能更好地关注这一流程中的重点步骤。

假设我们要实现一个简单的计数器，注意这里重要的一点是我们会在服务器端设置计数器的初始值。

其实现的思路大致如下：

1. 请求到来，服务器初始化React应用，并将其渲染成字符串。（这里第一次生成一个ReactElement）

2. 把React生成的字符串放到模板中，生成完整的HTML内容返回给浏览器。

3. 在浏览器初始化React应用。（这里第二次生成ReactElement）

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
  req.send(
    \`<html>
      <head></head>
      <body>
        <div id="main">${counterString}</div>
        <script src="/bundle.js"></script>
        <script>
          window.\__INITIAL_COUNT\__ = ${initialCount};
        </script>
        <script src="/bootstrap.js"></script>
      </body>
    </html>\`
  );
});

app.listen(8080);
```

当浏览器上的请求从服务器上返回时，bootstrap.js脚本被加载运行，在浏览器上初始化完整的React应用：

```js
// bootstrap.js
React.render(
  <Counter initialCount={window.\__INITIAL_COUNT\__}/>,
  document.getElementById('main')
);
```

到这里，我们的计数器应用就顺利地加载在了浏览器上，并且这一次，我们的页面一开始不会像SPA应用那样空空如也。

这一过程就像是我们的React应用的初始化过程被分成了两次进行。先是在服务器上，我们初始化了React应用中的HTML的内容，并发送到前端；然后浏览器接过了这些内容，继续进行DOM事件绑定等工作。而值得注意的是，为了能在前端以正确的初始状态启动应用，我们需要把我们应用的状态（上面例子中的`window.\__INITIAL_COUNT\__`）也一并传过去，用于初始化。

## 事实上，我们在用React替代服务器端的模板引擎

如果你回想一下这一过程，你可能会注意到这一流程中React承担起了在服务器上本应由模板引擎处理的(template engine)大部分工作$sidenote(现在的React是无法生成`html`, `script`等标签的)。

如果你写过服务器端模板，同时也很熟悉React，那你可能会和我有同样的感受：React中的模板（或者说是jsx）用起来甚至比专业的模板引擎更加顺手。因为使用模板引擎意味着你在用一门模板语言和javascript交互；而React本身就是javascript，jsx本质也是javascript，所以React中的“模板”用起来要自然得多。

如果你只需要静态页面的话，你完全可以写一些没有state的React部件来承担服务器上模板引擎的大部分工作。事实上现在已经有[express-react-views](https://github.com/reactjs/express-react-views)这样的库来实现这一目的$sidenote(它是由React的核心贡献者维护的)。

那么让一门前端框架作为模板引擎是不是多余之举呢？

我认为完全相反。浏览器上js所需要的模板和服务器上渲染的模板原本就应该是同一份模板，它们同属于我们浏览器上的应用。只不过由于种种原因，我们一直不得不将其拆分成两部分。那么现在如果服务器的这份模板由本身就主要用于浏览器上的React来生成的话，我觉得是再合理不过的了。

// TODO: 图来解释这一流程

当然因为React无法生成所有常用的标签，所以你可能还是需要模板引擎来帮你处理这部分工作。

并且这样做，我们可以充分利用同一份代码，技术栈也会变得更加简单。想象一下，没有html、template、ejs、jade等文件，你的js文件就是你的模板文件，你可以直接利用js上的模块等特性，这能够省多少事！

但是如果你把之前用于浏览器上的React部件直接拿来服务器渲染的话，可能得不到你想要的结果，举个例子：你很可能在会直接使用全局变量window，但在node上这会抛出错误。你需要在写他们的时候就考虑清楚一个部件在服务器上渲染时可能会遇到的问题。

而你的React部件拥有state的话，你是没办法直接控制他们的状态的。但如果你使用[Redux](https://github.com/rackt/redux)来将部件中的state移动到外部的话，你就可以通过Redux来控制你部件的状态。

## 一个简单的benchmark

但React不是纯粹的模板引擎，那么与node上其他的模板引擎相比，它的server render的性能会不会差很多呢？这里我们将前面的计数器代码做一下改动，通过一个小范围的、非常简单的benchmark来对比React和ejs之间性能的量级：

设备：Windows 8.1 Intel(R) Core(TM) i5-4210M CPU @ 2.60GHz 2.59GHz  8.00GB

版本：React 14.0.2，ejs 2.3.4

ejs使用的模板文件：

```html
<div>
  <label>数值:<%=count%></label>
  <button>+1</button>
</div>
```

React Counter(es6中类的形式)$sidenote(下面的代码都使用了babel进行转换，可能对结果会产生一些影响)：

```js
import React from 'react';

class Counter extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>数值:{this.props.count}</label>
        <button>+1</button>
      </div>
    );
  }
}

export default Counter;
```

React Counter(传统方式)：

```js
import React from 'react';

const Counter = React.createClass({
  render() {
    return (
      <div>
        <label>数值:{this.props.count}</label>
        <button>+1</button>
      </div>
    );
  },
});

export default Counter;
```
测试时的渲染语句：

```
// React
renderToString(<Counter count={10}/>);

// ejs
ejs.render(template, {
  count: 10,
});
```

设置node环境为`production`，避免React做一些用于开发环境的工作，并开始渲染：
```
NODE_ENV=production node lib/index.js
```

结果如下：

数值单位是ope/sec（每秒渲染数）越高越好

|模板|第1次|第2次|第3次|第4次|第5次|
|----|-----------------|--|--|--|--|
|React ES6 class|7981|9043|11718|8165|8034|
|React classic|7172|6904|7421|7592|8030|
|ejs|17905|17743|16763|19261|17437|


然后你可以在通过下面这个链接再对比一下ejs和node上其他一些模板引擎的性能，来了进行更详细的对比：[Node Template Engine Benchmarks](http://paularmstrong.github.io/node-templates/benchmarks.html)$sidenote(如果这个结果对于其他情况也是有效的话，那或许我们可以认为React的性能超过了jade。当然这里还是要说一句，在做技术选择时不应过于纠结于性能。)

如果这个结果对于其他情况也是有效的话，那我个人认为React server render的性能已经足够优秀了。况且React远不止是模板引擎。

## 结论



## 相关链接

StrongLoop的教程: [How to Implement Node + React Isomorphic JavaScript & Why it Matters](https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/)

[React Redux Universal Hot Example](https://github.com/erikras/react-redux-universal-hot-example)
