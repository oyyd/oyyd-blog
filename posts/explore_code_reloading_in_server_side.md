# 在redux上探索前后端一体的热替换体验

- core redux-thunk-dispatch
  - why? try to provide better DX
    - what does react-hot-loader provide
    - How could that be for server code
  - How? possible way
    - rebuild current state with same actions and different server state
    - redux and redux-devtools-instrument model
    - replace actions
  - Detail
    - projects

- lein-figwheel react-hot-reload
  - core idea(keep state)
  - it does matter to ui developing
  - not mature
    - to those code that are not "reloadable"
    - difficult to integrate it into your system
    - you have to write extral code
    - new code needs to consider hot
- about server side
  - They are already hot reloadable/stateless in most situations. But...
  - how to integrate it with ui developing
  - idea one - reload everythin
  - react and redux
    - possibility
    - redispatch thunk/promise actions
      - they fit very well in my opinion
      - how
      - it's not so good
      - trial example
- to javascript developer and full stack and agile developing

## react-hot-loader的开发体验

熟悉react开发的人，或多或少会多听过甚至尝试过[react-hot-loader](https://github.com/gaearon/react-hot-loader)，并为之眼前一亮。在多加探索一下，便会发现lisp/clojurescript和[lein-figwheel](https://github.com/bhauman/lein-figwheel)。更准确的说，软件上的[hot swapping](https://en.wikipedia.org/wiki/Hot_swapping)本身也不是新概念。

那么这个react-hot-loader提供的这种能力的意义在哪里呢？我们知道在UI开发的过程中需要进行很多调整工作，当我们发现当前应用的样式与我们的期望不符时，我们会修改代码并刷新浏览器查看新代码所展现的样式。而刷新页面会让我们的应用当前的状态丢失，恢复到初始状态。举个在开发中常见的例子，假设我们在开发一个包含多个步骤的页面：

![steps]()

假设第一步、第二步都是表单填写，而且所有的步骤都需要依次进行。那我们在调整第三个步骤的页面展示时，我们每次修改完代码刷新页面后都需要重新填写前两个步骤的表单后，才能看到第三个步骤的页面展示。这个过程是耗时而痛苦的。

而通过react-hot-loader和css的热替换工具，我们就能够让页面应用保持在“现在是处在第三个步骤”的状态，同时不断修改我们的代码查看页面展示。样式调整往往又是个期望很模糊的过程，会进行多次，所以hot swapping的概念对ui开发来说很有价值。

我们可以把hot swapping的过程理解成是 **保持应用的状态（state）** ，同时 **更新无状态的代码** ，用新的组件和样式重新渲染当前的状态，避免了（诸如刷新页面这类操作所带来的）将应用从初始状态（步骤一）调整到目标状态（步骤三）的繁琐过程。

现在让我们放眼前后端开发，假如我们在同时进行前后端的代码开发，我们的后端用的是node、python、ruby、php等重启动非常迅速的脚本语言，修改完后端代码后我们也需要刷新页面的查看新的页面状态，那么这一个过程是否和react-hot-loader解决的问题一致？是否也能够通过类似的手段得到解决呢？我们有没有可能能够不刷新页面呢？或许不少尝试过react-hot-loader的人都和我一样思考过这一点。

## 服务器和浏览器之间state和props的转换

首先思考一下，服务器上的应用对于浏览器上的应用而言是怎么样的角色呢？假如我们把前后端的应用当成是一个整体，我们会发现，服务器给浏览器提供了状态（state）。比如说一个购物车页面，购物车里面的内容是服务器告诉我们的。也就是浏览器应用的状态是基于服务器端应用构建的。

再回来思考hot swapping的过程，“保持应用的状态，更新无状态的代码”，那么我们更新了服务器上的代码实际上影响的是浏览器应用的状态，hot swapping实际上是不成立的。

那么我们是不是无事可做了呢？也不一定。

如果说浏览器应用的状态是通过服务器应用构建而成，那我们应该可以以某种把浏览器应用看成

当然，不管我们怎么看待这个问题，更重要的还是能做点什么产生点价值。

## detail

react应用帮助我们保持数据。

想要在做一套

## 只是实验，远不完美

## extral

“Not Magic, just plain old file reloading”。

react-hot-loader再做的事情便是当代码发生改变时，保持应用的状态(state)，替换其他代码，并执行一次重渲染。

“the developer has to take care to make their code reloadable”。然而不遵守一定的，开发reloadable的代码和应用是非常困难。

那么如果我们在进行前端代码开发的同时如果也在进行后端代码的开发过程中（比如你在写node），我们有没有可能把这种开发经验也带到后端开发中，从而做到在修改完后端代码重启后，仍能保持更新浏览器应用的状态，而不用刷新页面呢？(当然这里特指脚本开发，需要大量编译时间的后端应用我们肯定需要等)

我们可以重新思考一下应用的状态。我们知道对于react来说，如果我们在一个父组件A中定义了`state`，然后把`state.a`传递给A的子组件B，那么这个`a`属性对于B来说则是`props`。也就是应用中的某一个`state`对于应用的其他部分来说只是`props`。

不考虑localStorage等浏览器上的持久化层，我们知道我们浏览器上的应用的数据都是来源于服务器上的。如果我们把浏览器和服务器看成是两个react组件（我知道这个比喻看起来很傻），并把这一个整体看成是一个应用，那我们可以认为浏览器上的状态只不过是个props，它来源于服务器端的state。那么当我们把

![]()

通过react-hot-loader，我们在前端代码热替换的需求得到了一定程度的解决。但如果我们同时也在进行脚本语言的后端代码开发，我们修改后端。特比的p

作为一个web前端开发者，我习惯性地把react-hot-loader的想法带入到后端代码的开发中，以希望能在修改后端代码的以后使得前端的应用同样保持。

而我很快发现，我们把后端应用的状态储存在缓存和数据持久层上，即便代码发生改变并重新加载运行，我们应用的状态也不会直接发生改变。换言之web应用的后端代码大多数本身就已经是无状态、reloadable的了，而对于重新启动非常快速的脚本语言和应用而言，即使我们的后端代码不能真正做到hot swapping，只是单纯的重新启动也能获得相似的效果。

所以重点不是改变后端代码，而是在于从hot swapping的角度考虑后端应用对于前端应用而言，怎样的形式会存在价值并且易于被接受。
