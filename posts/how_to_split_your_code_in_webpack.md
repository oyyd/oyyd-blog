# 使用webpack分割代码的思路

2016年01月18日

__前言：__

可能你跟我一样最开始只是把webpack作为打包的工具，把所有的东西都打包进一个bundle.js文件供我们的应用使用。这种做法不仅简单、利于缓存，更重要的它可以使得我们的JavaScript代码更像是其他的编程语言那样运作，而不用为模块和加载的问题操心太多。但随着代码的不断增长，需要加载的代码会不断增加，并且当我们期望某些页面在移动设备上（app或浏览器）运行时，非wifi的网络环境会使得资源加载时间显得更加不可接受。

好在webpack是个非常强大且扩展性极强的工具，它提供了一些强大的特性来帮助我们解决这一问题。

## 基本原则

事实上把所有的js文件打包成一个文件是一种极端做法，而按需加载每一个JavaScript文件则是另一种极端做法。这两种做法并没有绝对的优劣，这里我们需要做的事情是在这两个极端之间找到一个相对可以接受的做法。

如果你希望了解得更多的话，可以参考链接中的这篇文章。这篇文章很好地讲述了汗学院面对这一困境的思路：
[The JavaScript Packaging Problem](http://jamie-wong.com/2014/11/29/the-js-packaging-problem/)

而从缓存、压缩比、请求次数等角度来看，我认为打包的方式是整体优于按需加载的，即“多加载代码”总是整体优于“按需加载代码”。这也是下文做法的依据。

## 在webpack上我们可以利用的工具

webpack主要支持两种代码分割方式，一是在应用的代码中设置split points，另一种则是在是在webpack的配置文件中设置代码块。

### split points

split points会告知webpack代码的分割位置，webpack依次设置代码块(chunk)，并在运行环境中由webpack自动加载代码块：

```js
// 这样的模块会被webpack打包在同一个代码块中，
// 所以我们总是能保证代码已经存在
var _ = require('lodash')

// 利用ensure和require来动态加载代码
require.ensure([], function(require) {
  let contacts = require('./contacts')
})
```

实际上`require.ensure`这种方式有些像requirejs或其他浏览器上的模块加载库。webpack可以根据split points来将多个文件自动打包成一个代码块（chunk），并在运行时（比如浏览器上）自动加载依赖的代码块。因为是以代码块为单位，而不像其他库一样是以单个JavaScript文件为单位，所以相比于传统的模块相关的库来说，webpack可以帮我们做很多优化。

但值得注意的是，`require.ensure`并不是真正的动态加载，虽然同样是在运行中加载依赖，但webpack会加载所有的依赖$sidenote(也有特别的情况，比如在`if`语句中，如果条件为`false`，则代码体中的`require`就不会被执行)，比如在下面的代码中：

```js
require.ensure([], function(require) {
  var shouldLoad = false;
  if (shouldLoad) {
    // 虽然这块代码不会被真正执行，但webpack还是会事先加载这一模块
    let contacts = require('./contacts')
  }
})
```

虽然这`if`中的代码不会被真正执行，但webpack还是会事先加载这一模块。

我个人不喜欢这种做法，因为相比于后面在配置中进行的代码分割的方式来说，它实际上在代码中引入了另一种机制来加载模块，代码及加载状态会变得更加复杂。但这种做法把代码的分割加载工作都交给了webpack，充分利用它能省下不少工作，所以充分利用这一特性也是一种选择。

### 通过配置文件分割代码

另一种方式是在webpack的config文件中配置代码块。单纯配置入口文件的话，webpack会将入口文件所涉及的所有文件都打包到一个文件里面。但这也意味着两个入口文件所生成的代码块之间会有很多重复的部分，并且完全不能利用浏览器的缓存机制。比如你的两个入口文件都用了react，那打包出来的两份文件都会有react，没办法交叉利用。

为了解决这一问题，webpack提供了插件`CommonsChunkPlugin`来帮助我们自动抽取出代码块中相同的部分：

```js
var path = require("path");
var CommonsChunkPlugin = require("../../lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        pageA: "./pageA",
        pageB: "./pageB",
        pageC: "./pageC",
        adminPageA: "./adminPageA",
        adminPageB: "./adminPageB",
        adminPageC: "./adminPageC",
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js"
    },
    plugins: [
        //将adminPageA和adminPageB中相同的依赖打包到admin-commons.js文件中
        new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
        //将pageA、pageA和admin-commons.js中相同的、并且至少被两个chunk使用的依赖打包到commons.js文件中
        //注意这里显示出CommonsChunkPlugin生成的chunk也可作为参数传入
        new CommonsChunkPlugin("commons.js", ["pageA", "pageA", "admin-commons.js"], 2),
        //将pageC和adminPageC中相同的依赖打包到c-commons.js文件中
        new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
    ]
}
```

然后我们只要在HTML文件中依次引入代码块即可：

```html
<!--pageA.html-->
<html>
    <head></head>
    <body>
        <script src="js/commons.js" charset="utf-8"></script>
        <script src="js/pageA.js" charset="utf-8"></script>
    </body>
</html>
```

```html
<!--adminPageA.html-->
<html>
    <head></head>
    <body>
        <script src="js/commons.js" charset="utf-8"></script>
        <script src="js/admin-commons.js" charset="utf-8"></script>
        <script src="js/adminPageA.js" charset="utf-8"></script>
    </body>
</html>
```

这样，`commons.js`和`admin-commons.js`就能够有效地被浏览器缓存了。

特别值得注意的是，`CommonsChunkPlugin`甚至提供了`minChunks`和`minSize`这两个配置来筛选文件，从而调节入口文件（entry）所打包成的文件和通用代码块（commons chunk）之间的大小配比。`minChunks`和`minSize`越小，则commons chunk文件则越大，代码被缓存的几率越大，加载的冗余代码也更多；反之commons chunck文件则越小，代码被缓存的几率越小，但加载的冗余代码也更少。

通过编写入口文件我们可以将所有可能被用到的文件打包成一个文件，而通过利用`CommonsChunkPlugin`，我们可以有效地缓存不同入口文件之间重叠的代码，特别是对非单页应用而言，这点非常重要。这种方式分割的代码不会像split points那样会自动加载，我们需要按照依赖依次引入分割而成的文件。

## 简单的代码分割思路

首先把所有页面100%会被使用的文件分割出来，即打包成vendor文件。这类文件主要是外部依赖，比如：React、jQuery这样的framework，或是momentjs等经常会用到的代码库。

然后再为需要严格控制js文件大小的页面编写独立的入口文件，比如运行在移动设备上的活动页面。独立的入口文件会保证打包出来的文件没有（太多）冗余。

对于其他没有那么严格的要求的页面来说，我们可以从整体按照某一套规则来分割代码。比如前面链接中的汗学院把代码分割成了：`core-package.js`，`content-package.js`，`homepage-package.js`。

问题是通过配置打包成的文件需要我们手动管理依赖，即按照依赖关系在页面中依次引入script标签，这种做法在依赖十分复杂的情况下是不可接受的。那这时候通过`require.ensure`来帮助我们管理依赖或许是个不错的主意。
