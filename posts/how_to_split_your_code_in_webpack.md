# 使用webpack分割代码的思路

__前言：__

可能你跟我一样最开始只是把webpack作为打包的工具，把所有的东西都打包进一个bundle.js文件供我们的应用使用。因为这样做不仅简单，更重要的它使得我们的JavaScript代码更像是一般的，。但随着代码的不断增长我们不可避免的发现代码实在是增长的太快了以至于。更糟糕的一些情景是，我们期望某些页面在移动设备上（app或浏览器）运行，而移动设备在非wifi的网络环境下加载资源的速度就更加糟糕了，显得某些条件，并且你确实有很多代码并不需要加载到移动设备上。

webpack是个非常强大且扩展性极强的工具。

那么下面我会简单阐述我对，使用webpack分割代码的想法。

## 基本原则

### 浏览器上JavaScript模块的困境

这篇文章很好地讲述了汗学院面对这一困境的思路：
[The JavaScript Packaging Problem](http://jamie-wong.com/2014/11/29/the-js-packaging-problem/)

事实上把所有的js文件打包成一个文件是一个极端，而按需加载每一个JavaScript文件则是另一个极端。这两个极端并没有绝对的优劣，这里我们需要做的事情是在这两个极端之间找到一个相对可以接受的做法。

而从缓存、压缩比、请求次数等角度来看，我认为打包的方式是整体优于按需加载的，即“多加载代码”总是整体优于“按需加载代码”。这也是下文做法的依据。

## 在webpack上我们可以利用的工具

webpack主要支持两种代码分割方式，一是在应用的代码中设置split points，另一种则是在是在webpack的config文件中配置代码块。

### split points

split points会告知webpack代码的分割位置，webpack依次设置代码块(chunk)，并在运行环境中由webpack自动加载代码块：

```js
// 普通的static imports
// 这样的模块会被webpack打包在同一个代码块中，
// 所以我们总是能保证代码已经存在
var _ = require('lodash')

// dynamic imports
// 利用ensure和require来动态加载代码
require.ensure([], function(require) {
  let contacts = require('./contacts')
})
```

实际上这种方式允许我们利用webpack来替代requirejs或其他浏览器上的模块加载库。并且webpack可以根据代码的依赖来将多个文件自动打包成一个代码块（chunk），所以加载时也是以代码块为加载单位，而不像其他库一样是以单个JavaScript文件为单位，这就意味着我们不需要做太多事情，webpack就能帮我们做很多优化。

这种做法允许动态/按需加载代码，但我个人不喜欢这种代码

###  

另一种方式是在webpack的config文件中配置代码块。单纯配置入口文件的话，webpack会将入口文件所涉及的所有文件都打包到一个文件里面。但这也意味着两个入口文件所生成的代码块之间会有很高重复的部分，并且完全不能利用浏览器的缓存机制。

为了解决这一问题，webpack提供了插件`CommonsChunkPlugin`来帮助我们抽取出依赖中相同的部分：

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

特别值得注意的是，`CommonsChunkPlugin`甚至提供了`minChunks`和`minSize`的配置来允许我们筛选进入，从而调节入口文件（entry）和通用代码块（commons chunk）之间的大小配比。`minChunks`和`minSize`越小，则commons chunk文件则越大，有效代码的缓存率越大，加载的冗余代码也更多；反之commons chunck文件则越小，有效代码的缓存率越小，但加载的冗余代码也更少。

我个人偏好后者，其理由在于

## situations

现在让我们考虑一下
