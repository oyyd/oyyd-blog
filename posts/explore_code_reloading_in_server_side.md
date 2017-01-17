# 在redux上探索无需刷新前端页面的后端开发体验

$publicdate(2017年01月15日)

TL;DR: 后端应用为前端应用提供了状态（state）。借助redux，我们可以在服务器重启后重新拉去数据，替换action，构建相同条件下的新状态，从而不需要刷新页面来重启前端应用。这对于以重启非常迅速的脚本语言作为后端语言的应用，并且是同时进行前后端开发的场景来说，可以提供更好的开发体验（当然或许并不能，但探索终归是好的）。如果你对这个话题感兴趣的话，可以查看这两个项目：

- [redux-thunk-dispatch](https://github.com/oyyd/redux-thunk-dispatch)
- Demo [redux-thunk-dispatch-todosmvc](https://github.com/oyyd/redux-thunk-dispatch-todosmvc)

## 从react-hot-loader开始说起

熟悉react开发的人，或多或少会多听过或是尝试过[react-hot-loader](https://github.com/gaearon/react-hot-loader)，并为之眼前一亮。再多加探索一下，便会发现lisp/clojurescript和[lein-figwheel](https://github.com/bhauman/lein-figwheel)，而软件上的[hot swapping](https://en.wikipedia.org/wiki/Hot_swapping)本身也不是新概念。

那么这个由react-hot-loader所提供的这种能力的意义是什么呢？我们在UI开发的过程中需要进行很多页面调整的工作，当我们发现当前应用的表现与我们的期望不符时，我们会修改代码并刷新浏览器查看新代码所展现的结果。而刷新页面会让我们丢失应用当前的状态，恢复到初始状态。然后我们需要重新操作应用将应用调整到我们所要调试的状态上。举个在开发中常见的例子，假设我们在开发一个包含多个步骤的页面：

![steps](https://cdn.rawgit.com/oyyd/images/5223a68d/github/redux-thunk-dispatch/steps.png)

假设第一步、第二步都是表单填写，而且所有的步骤都需要依次进行。那我们在调整第三个步骤的页面展示时，我们每次修改完代码刷新页面后都需要重新填写前两个步骤的表单后，才能看到第三个步骤的页面展示。这类过程往往是耗时而痛苦的。

而通过react-hot-loader和css的热替换工具，我们就能够让页面应用保持在“前面的表格都已经填写，现在是处在第三个步骤”的状态的同时，可以不断修改我们的代码查看页面新的效果。而样式调整往往又是个期望很模糊的过程，会进行多次。这个过程越是麻烦，热替换的概念对ui开发来说就越有价值。

我们可以把hot swapping的过程理解成是 **保持应用的状态（state）** ，同时 **更新无状态的代码** （或是对应的那部分状态你并不关心），再用新的组件和样式重新渲染当前的状态。它帮助我们避免了（因诸如刷新页面等操作所带来的）将应用从初始状态（步骤一）调整到目标状态（步骤三）的繁琐过程。

现在让我们放眼前、后端开发，假如我们在同时进行前后端的代码开发，我们的后端用的是node、python、ruby、php等重启动非常迅速的脚本语言。在我们修改完后端代码后，我们也需要刷新页面的查看新的页面状态，那么这一个过程是否和react-hot-loader所要解决的问题一致？是否也能够通过类似的手段得到解决呢？我们有没有可能能够不刷新页面，而是留在当前页面继续开发呢？或许不少尝试过react-hot-loader的人都和我一样思考过这一点。

## 服务器和浏览器之间的状态转换

首先思考一下，服务器上的应用对于浏览器上的应用而言是怎么样的角色呢？假如我们把前后端的应用当成是一个整体，我们会发现，服务器给浏览器提供了状态（state）。比如说一个购物车页面，购物车里面的内容是服务器告诉我们的。也就是说，浏览器应用的状态是基于服务器端应用构建的。

再回来思考热替换的过程，“保持应用的状态，更新无状态的代码”，那么我们更新了服务器上的代码实际上影响的应该是浏览器应用的状态，所以热替换实际上是不成立的。

那么我们是不是无事可做了呢？也不一定。

如果说浏览器应用的状态是通过服务器应用构建而成，那我们应该可以把浏览器上应用的状态分成两部分，一部分跟服务端应用无关，另一部分数据是基于服务端应用的数据构建的。那么跟服务器端应用无关的状态不会受到服务器端应用代码改变的影响，只要我们不是刷新页面重启应用的话就不需要额外做什么。

而基于服务端应用数据构建的状态，既然是基于服务器端应用的数据构建的，那对于后端应用来说，前端应用就可以被认为是无状态的。还是举购物车的例子，购物车里面已添加的商品的数据来源于后端应用，我们可以认为是：

1. 请求购物车中的商品数据
2. 渲染应用
3. 等待UI交互修改应用状态

现在换个角度，认为我们是在：

1. 进行"请求购物车中的商品数据"
2. 渲染应用
3. 等待UI交互修改应用状态

这里看起来并没有什么不同，但你可以想一下，购物车中的商品的数据是会随着后端应用发生改变的，但"请求购物车中的商品数据"这一事实不会（这实际上也是[redux-devtools-instrument](https://github.com/zalmoxisus/redux-devtools-instrument)中`liftedStore`的做法，也是常见的函数式编程的看法）。在这里，我们把这一事实当成是前端应用的状态，而这个状态与后端应用无关，也就是对于后端来说前端是无状态的。当我们把前后端应用当成是一个整体时，我们可以认为 **前端应用是无状态的，所有的状态都来源于后端应用**。

那么在服务器端应用的代码发生改变重启后，如果我们能按照一定的条件重新获取服务器端应用的数据并重新构建出当前应用的状态的话，就能够达到与react-hot-loader理论上相似的效果。

当然，你可能并不这么想，但不管我们怎么看待这个问题，更重要的还是能做点什么产生点价值。

## 重新构建前端应用中来源于后端应用的状态

当后端应用重启后，重新拉取数据很容易，困难的是如何利用这些数据重新构建应用的状态。特别是我们希望达到的效果是：在我们对浏览器应用进行各种操作以后，重新构建的数据仍旧能够以某种形式保持有效的逻辑，而不是单纯地用后端数据更新前端应用的状态。举个例子，假如我们改造一下经典的todos，让它的初始数据从服务器端获取，其它照常：

![todos](https://cdn.rawgit.com/oyyd/images/5223a68d/github/redux-thunk-dispatch/todos.png)

然后我们在浏览器上修改了第二条todo的数据，将它从`todo2`改成`mytodo`：

![todos-changed](https://cdn.rawgit.com/oyyd/images/5223a68d/github/redux-thunk-dispatch/todos-changed.png)

假如这时候我们修改服务器端应用的代码，将初始的数据全都添加下划线：

```js
const todos = [{
  text: '_todo1',
  completed: false,
  id: 0,
}, {
  text: '_todo2',
  completed: true,
  id: 1,
}];
```

那么这时候我们想要的重新构建出来的前端应用的状态是什么呢？是`_todo1`和`mytodo`。如果单纯构建用新的数据更新浏览器的状态，变成`_todo1`和`_todo2`的话，我们就丢失了我们在前端将第二条记录修改成`mytodo`的这一事实。那样我们就将破坏了前端应用的状态了。

实际的应用场景会比这个例子更加复杂，这看起来是一件非常困难的事情。但如果你熟悉react社区流行的东西的话，或者联想一下本文的标题的话，你应该感觉到我说的是[redux](http://redux.js.org/)，或者更朔源一点地说，是[kafka](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/)的做法。

我们可以简单认为redux中的状态（state）总是通过多个action来生成的。如果我们记录下这些action，修改其中的一些（或者不修改），再让redux中的reducer用新的actions重新生成状态，那我们就能得到具有某些意义的新的应用状态。而这也正是[redux-devtools](https://github.com/gaearon/redux-devtools)的做法。

现在我们需要让redux帮我们记录下所有来源于后端应用的数据查询操作，并在后端应用重启时，**重新拉取这些数据，再按照原来的顺序替换掉对应的actions，重新生成应用状态**：

![replace-actions](https://camo.githubusercontent.com/7e80f4e28d5c7aaf4afa2b3ed234ed6cf353d247/68747470733a2f2f63646e2e7261776769742e636f6d2f6f7979642f696d616765732f6d61737465722f6769746875622f72656475782d616374696f6e732d64697370617463682e706e67)

最终我们就能达到这种效果：[todosmvc.gif(2.9MB)](https://camo.githubusercontent.com/ca390e472aaab7d1b235ebaea80dd11aeeeebb26/68747470733a2f2f63646e2e7261776769742e636f6d2f6f7979642f696d616765732f32666439646361362f6769746875622f72656475782d7468756e6b2d64697370617463682d746f646f736d76632e676966)

如果你对内部的细节感兴趣的话，记得查看这个项目：[redux-thunk-dispatch](https://github.com/oyyd/redux-thunk-dispatch)，或者试试上面这个[redux-thunk-dispatch-todosmvc](https://github.com/oyyd/redux-thunk-dispatch-todosmvc)例子，改一改代码，试试一些更复杂的状况，看看效果。

## 只是实验，远不完美

redux-thunk-dispatch假定了你使用的是[redux-thunk](https://github.com/gaearon/redux-thunk)来处理异步操作。在这里使用redux-thunk的好处在于你可以大胆地在thunk函数中调用`store.getState`来获取应用的状态，这一操作会一直保持有效的意义。但同时也因为redux-thunk过于灵活，对于在一个thunk中多次调用`dispatch`的情况，redux-thunk-dispatch并没有覆盖到。而对于thunk dispatch另一个thunk的情况，这个项目也没办法把新的thunk替换掉（但这个问题本身非常有意思，或许用rxjs来处理会更加合适）。这些事情我也没有想好要怎么做更合适。

对于这个话题，我觉得更重要的事情在于，在前后端一体化的热替换上，我们究竟希望从后端得到什么样的开发体验？react-hot-loader的热替换有很多不能覆盖到的地方，但它解决了UI调试中的一些问题，它就能充满价值。同样，如果我们也能够在实践中明白我们想要的后端热替换体验的话，很多问题可能也就不是问题了。

对于这个话题有什么想法，也非常欢迎与我交流。
