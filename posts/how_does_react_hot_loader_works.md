# 探究Webpack中的HMR(hot module replacement)
$publicdate(2015年12月04日)

什么是HMR？HMR能做什么？我们可以看看react-transform的演示：
![react-transform-example](/static/posts/webpack-hmr/react-transform-example.gif)

react-transform的实现是基于webpack-dev-server之上的，这里我将从webpack-dev-server和React两方面简单总结HMR的实现原理。

（[从这里查看下文中的部分代码](https://github.com/oyyd/oyyd-blog/tree/master/research/react-hot-loader)）

## 从webpack-dev-server开始

webpack不仅能够起到打包的作用，它还“附带了”一个专门用于开发的、由express构建的迷你服务器，即webpack-dev-server。webpack-dev-server的基本作用是处理我们的打包任务，并且它还会作为一个静态文件服务器提供我们最新打包成的静态文件供本地开发使用。webpack-dev-server与我们平时开发用的静态文件服务器的不同之处在于，它知道新的文件在何时被打包了出来，以及究竟是哪个文件发生了改变。

在“webpack-dev-server知道何时新文件会被打包出来的”这个基础之上，webpack-dev-server可以和浏览器之间建立一个web socket进行通信，一旦新文件被打包出来，webpack-dev-server就告诉浏览器这个消息，这时浏览器就可以自动刷新页面$sidenote(或是刷新iframe)，而不用等到开发者手动刷新。

![complete-version](/static/posts/webpack-hmr/hot-reload.gif)

对的，到这里webpack实际上已经实现了[livereload](http://livereload.com/)的功能。

## 使用HMR的相关api

webpack知道是哪个模块发生了改变，并且还提供了api帮助我们更新应用的状态。在这基础之上，只要我们知道要怎么用更新后的模块来更新我们的应用，我们就不需要刷新页面来重新加载整个应用了。

比如说我们需要使用一个模块A，这个模块A是个React Component，用来在页面上渲染`hello world`。对于这个简单的React Component来说，我们只需要在它更新以后重新渲染就能够保持应用的状态，而不需要其他工作。所以我们可以像下面这样做：

我们的SayHello.js文件：

```js
// SayHello.js
import React from 'react';

const color = 'black';

class SayHello extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{color: color}}>Hello, {this.props.name}!</div>
    );
  }
}

export default SayHello;
```

我们的sayHelloEntry.js，

```js
// sayHelloEntry.js
import React from 'react';
import ReactDOM from 'react-dom';

import SayHello from './SayHello';

const name = 'world';

function renderComponent(RootComponent) {
  ReactDOM.render(
    <RootComponent name={name}/>,
    document.getElementById('main')
  );
}

// 通过module.hot获取webpack提供的一系列的api
if (module.hot) {
  module.hot.accept(); // 接受模块更新的事件，同时阻止这个事件继续冒泡
  renderComponent(SayHello); // 进行渲染
} else {
  // 非HMR状态下的代码
  renderComponent(SayHello);
}
```

在浏览器上加载这个页面后，我们就可以尝试修改sayHelloEntry.js模块中的`name`的值或是SayHello.js模块中的内容来查看结果：

![complete-version](/static/posts/webpack-hmr/simple-version.gif)

虽然这个例子非常简单，但它也足以说明在webpack中的HMR的基本原理了。而你也应该很快注意到了，虽然在开发过程中，所有模块都有可能发生改变，但我们并不需要为每个模块写HMR代码。

那么当没有HMR相关代码的模块发生改变时，我们的应用到底是怎么运作的呢？这就是webpack HMR中的消息$sidenote(称为消息可能并不合适，但下文就这么用吧)冒泡（bubble up）机制。

![bubble-up](/static/posts/webpack-hmr/bubble-up.png)

当一个模块C发生改变，而模块内又没有HMR代码来处理这一消息时，那这一消息就会被传递到依赖模块C的其他模块上；如果消息在新模块上没有被捕获的话就会再次进行传递；如果所有的消息都被捕获了的话，那我们的应用就应该已经按照代码进行了更新；反之如果有消息冒泡到了入口(entry)文件还没有被捕获的话，那就说明我们的代码中没有处理这类变更方法，那webpack就会刷新浏览器页面，即从HMR回退到LiveReload。

## 在React上实现HMR

实现HMR时最复杂的地方是在应用层面上。现在在让我们看看如何在React上实现HMR。

虽然在上面的例子中，我们的SayHello.js就是React组件，但这里我实际上避开了在React上应用HMR时最困难的一点：我们应用的state。

如果我们把上面例子中的SayHello.js替换成一个计数器（Counter.js）的话：

```js
// Counter.js
import React from 'react';

class Counter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  plusOne() {
    this.setState({
      count: this.state.count + this.props.valueAddEachClick * 2,
    });
  }

  render() {
    const valueAddEachClick = this.props.valueAddEachClick * 2;
    return (
      <div>
        <label>Value: {this.state.count}</label>
        <button onClick={this.plusOne.bind(this)}>+{valueAddEachClick}</button>
      </div>
    );
  }
}

export default Counter;
```

虽然HMR依然有效，但每次模块更新后，你会发现Counter的当前计数又会回到初始状态。因为在这一过程中，React组件中的state丢失了。

state丢失的原因和React的diff算法$sidenote(关于React的diff算法，推荐看@vjeux的这篇[React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/))有关。简单来说就是React在判断如何更新应用时，如果发现两个React Element类型不同的话，则会直接用新的React Element替换旧的React Element。

像我们在HMR的过程中更新了Counter.js模块，会重新生成新的Counter，实际上新的Counter和旧的Counter不是同一个Counter，即它们是不全等的。

所以在当前React没有提供任何相关api的状况下，如果我们仍想要保留原来的state的话，那我们就不能用新的组件直接替换旧的组件，即我们要保留原来组件的外壳，并更新其上的所有方法（利用mutable data）。同时因为数据没有发生变化，所以我们还需要某种方式来强制命令React更新应用的状态。

而这事实上就是react-proxy和react-deep-force-update的作用了。这两个库同样也是react-hot-loader和react-transform的依赖。由于这两个库的实现本身相对复杂费解，同时跟React内部的一些机制紧密相连，所以这里便不再深入了。

我们可以利用这两个库来完成帮助我们保留Counter的state：

```js
//entry.js
import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './Counter';
import createProxy from 'react-proxy';
import deepForceUpdate from 'react-deep-force-update';

if (module.hot) {
  // module.hot.data是个{}，我们用它来在旧模块和新模块之间传递数据
  module.hot.data = module.hot.data || {};
  let {proxy, rootInstance} = module.hot.data;

  if (!proxy) {
    proxy = createProxy(Counter);
    const Component = proxy.get();

    rootInstance = ReactDOM.render(
      <Component initialCount={10} valueAddEachClick={2}/>,
      document.getElementById('main')
    );
  } else {
    proxy.update(Counter);
    deepForceUpdate(rootInstance);
  }

  module.hot.accept();

  module.hot.dispose(function(data) {
    // dispose方法用来定义一个一次性的函数，
    // 这个函数会在当前模块被更新之前调用。所以
    // 我们在这里，也就是proxy变量被销毁之前储存它。
    data.proxy = proxy;
    data.rootInstance = rootInstance;
  });
}
```

至此我们的代码也就小有所成了。

![complete-version](/static/posts/webpack-hmr/complete-version.gif)

总结：

HMR很有意思，虽然它看起来象是个玩具一样，但事实上它确实能够提高我们的开发效率，因为它缩短了我们初始化应用及手动恢复应用状态的时间。特别是对web前端这样，UI代码占很重一部分工作，随时需要查看应用样式的编程任务来说，这点更为重要。

但现在要应用HMR，限制很多。不过本文截至时，@gaearon已经成了facebook的一员了，或许之后还能期待一下React在开发环境上为我们提供更多的可能性也说不定。
