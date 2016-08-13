# 在node上hot load整个SPA应用的前后端(WIP)

背景：

之前关于react-hot-loader我曾写过一篇非常简单的文章来分析其中的原理。而之后我在接触网络编程时由于对相关知识和api的不熟练导致整个开发过程非常通过痛苦，我一直在不断地重启应用、发送请求来测试代码的正确性。在这段经历后我开始思考如何提高在node上开发应用的效率，特别是参考了clojure上的[lein-figwheel](https://github.com/bhauman/lein-figwheel)这个项目后让我深有感触，它不只是热加载前端的代码，还直接与前端应用连接了一个repl进行调试来提高开发效率和灵活性。但这里我更关注后端代码是否也能进行热加载来提高开发效率。

在这个视频中[Bruce Hauman - Developing ClojureScript With Figwheel](https://www.youtube.com/watch?v=j-kj2qwJa_E)有观众问lein-figwheel的作者Bruce Hauman是否能写一个用于clojure（而非clojurescript）的热加载项目，Hauman想了一下说“clojure本身的repl已经非常好了，你是想我帮你写吗？”（大意，Hauman应该是调侃这位观众如果真的有需要的话应该自食其力）。Node也有repl，但这并不能满足我的需求。于是我开始思考我需要的到底是什么。

## hot load的原理和真正的难点

### 对前端代码和hot load本质的一个比喻

我们可以把react, omjs, elm这样的UI代码库看成是一个特别的map纯函数；它将我们在浏览器上的应用中的 数据／状态／state（下文统称state）映射成UI，并在一定条件下（比如用户操作）改变state；state改变后会导致这个map函数的结果发生改变，即UI发生改变。

而我们的hot load的主要目的便是 __在保持state不发生改变的条件下，替换这个map函数并重新执行一次这个map函数__。

hot load这一流程相比于我们传统刷新页面（或后端重启应用）的好处在于，我们省略掉了恢复应用状态（state）的这一流程，我们迅速的得到了新代码给我们反馈。如果说[LiveReload](http://livereload.com/)都能给我们带来开发体验上的震撼的话，那hot load确实可以堪称是DX上的奢华体验。

### webpack中hot load的过程

再来回顾一下webpack hot server的实际流程。Hot load需要一套机制来控制应用中的modules，以便在收到新代码时替换代码并触发hot load。webpack hot server的在进行一次hot load流程时大致步骤是：

编辑器保存文本 -> 监视文件的任务监视到了文件的变化 -> 将发生变化的模块信息告诉浏览器上的模块控制机制 -> 模块控制机制替换相应模块的内容并触发一次热加载事件（本文如此称呼） -> __热加载事件从代码发生变化的模块开始进行冒泡__ -> 如果有热加载事件冒泡到最顶层的模块控制机制都没有被接受的话，模块控制机制会认为这次热加载无法被接受，于是进行`location.reload()`（或类似的操作）直接重新获取应用状态（这实际上就是退化到了LiveReload）。

这其中最重要的、也是需要我们主要去写代码的、也是热加载真正的难点的便是“热加载事件从代码发生变化的模块开始进行冒泡”的过程。见下图：

![bubble-up](/static/posts/webpack-hmr/bubble-up.png)

代码发生变化的模块中的hot load代码（如果有的话）尝试接受这次重新加载，如果接受则本次webpack判断本次热加载成功并结束，否则进行冒泡，即交由所有依赖这个模块的模块中hot load代码判断能否接受并进行一次热加载，不能接受则将这一“事件再次冒泡”到所有依赖当前模块的模块。这一过程不断重复直到所有的热加载事件都被捕获或存在热加载事件没有被捕获，冒泡到最顶层。

webpack(或是figwheel，见figwheel的[说明](https://github.com/bhauman/lein-figwheel#not-magic-just-plain-old-file-reloading))不过是为我们的hot load提供了一套机制：。其难点还是在于如何保持state并进行一次重新渲染，这对我们的代码，固然我们可以费尽心思对任何代码中的任何模块写一套专有的热加载机制，但那样做的代价未免太高昂了。而react这类框架从设计上就非常适合hot load的实现。

## 从hot load的角度考虑服务器上的代码相比于前端代码的特点

## 然而有一个特殊的例子 —— SPA单页应用

## 实现及boilerplate
