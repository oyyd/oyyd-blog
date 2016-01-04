# 探究JavaScript上的编译器 —— marked

__前言：__

如果你也用google去搜过编译相关的话题的话，会发现很难找到适合入门的内容。但与之相对的是，很多的库和特性的实现都离不开编译这一流程，我们去看一些开源的JavaScript代码时也经常会看到Lexer，Parser，Compiler，AST等东西。如果没有相关知识，那看这些代码时经常会一头雾水。

实际上在学习这部分内容时，可能阅读书籍([编译原理](http://www.amazon.com/dp/0321486811/?tag=stackoverfl08-20))是最合适的。因为编译的原理基本相近，也没有随时间推移而发生大的改变，经典的书籍依旧非常适用，但这里将尝试通过一些开源项目的代码来学习编译。虽然这种学习方式可能不够详尽，容易遗漏内容，但它也更有利于我们学习到开发实践中常用的编译（它们的代码结构通常会更加简单），以及了解不同环境下的编译过程的设计。

但这个话题本身涉及的范围较广，内容较深，所以对这些内容的学习将通三个项目的源码进行，它们分别是：[marked](https://github.com/chjj/marked) —— 它将markdown文本转换成可供浏览器使用的HTML标签, [nunjucks](https://github.com/mozilla/nunjucks/) —— 模板引擎和[Jison](http://zaach.github.io/jison/) —— 一个通用的parser生成器，三部分进行。

那这次让我们从marked开始。

## 基础理论：一个编译器的结构

首先还是让我们通过来粗略了解一下编译器的通用结构（摘自编译原理）：

1. Lexical Analysis/Scanning（词法分析），在marked中由Lexer实现。

2. Syntax Analysis/Parsing（语法分析），在marked中由Parser实现。

3. Semantic Analysis（语义分析），代码优化，在marked中没有实现。

4. 代码生成，在marked中由Parser和Renderer实现。

## marked中的代码结构

marked的目的是根据输入的markdown文本来输出可供浏览器解析的HTML内容，藉由：

```markdown
# 探究JavaScript上的编译器 —— marked

编译这个话题在JavaScript上很少出现...
```

生成类似这样的代码：

```html
<h1>探究JavaScript上的编译器 —— marked</h1>
<p>
  编译这个话题在JavaScript上很少出现...
</p>
```

编译目标的不同会直接使得我们代码结构大相径庭。所以对任何编译相关的代码，时刻明确我们的设计的目的可以很好地帮助我们理解代码。

marked由四部分组成，分别是: Lexer、InlineLexer、Parser、Renderer。

![marked-composition](/static/posts/javascript-compiler/marked_composition.png)

其中Lexer会处理最原始的文本，它将文本处理、抽象，提供tokens供Parser使用；Renderer提供一组api供Parser和InlineLexer调用，以生成HTML；而Parser将对Lexer提供的tokens进行进一步处理，并据此调用Renderer中的api生成最终的HTML字符串。

### Lexer

Lexer用来将源码转换成tokens供Parser使用，其表现如下：

```js
const tokens = marked.Lexer.lex('# title');

// tokens:  
// [ { type: 'heading', depth: 1, text: 'title' } ]
```

Lexer生成的tokens事实上只是对源码的抽象和描述。通常tokens都会有一个属性来描述其“类型”（上面生成的tokens中的“type”属性），并有可能有一个或多个“值”属性来描述具体信息（上面tokens中的“title”和“title”属性）。

### InlineLexer

marked中还有InlineLexer，从名称上看我们可以猜测它的整体作用和Lexer相近。但InlineLexer是有两点不同：一是InlineLexer只用于处理诸如：`__strong__`、`~~line-through~~`这样的内联文本；二是InlineLexer不返回tokens给Parser使用，它会直接利用Renderer将源码转换成HTML内容。

```js
const output = marked.InlineLexer.output('__strong content__', {}, {});
// output: '<strong>strong content</strong>'
```

所以Parser在处理内联文本时，是直接使用InlineLexer生成结果，而不是像Lexer一样依据tokens用Renderers生成HTML。

### Renderer

在Parser之前，我们先来看看Renderer的表现。我们可以直接使用Renderer生成HTML:

```js
const options = {
  headerPrefix: 'header-id',
};
const renderer = new marked.Renderer(options);
const output = renderer.heading('hello world', 2, '');

// output: '<h2 id="header-id">hello world</h2>'
```

我们可以看到在marked中，Renderer上的方法生成的内容就是我们所期望的HTML内容了。

### Parser

```js
const tokens = marked.Lexer.lex('# hello world');
const output = marked.Parser.parse(tokens);
// output: <h1 id="hello-world">hello world</h1>
```

因为markdown的语法规则不像编程语言一样复杂，所以marked中的Parser相对简单，基本上就是按顺序将tokens转换成转换成HTML内容。

## 实践：扩展marked

为了验证对marked的理解是否正确，我试着fork并修改了marked的代码（[github地址](https://github.com/oyyd/marked-chartjs-binding)），绑定了chartjs，令我们可以在markdown中调用渲染图表。

你可以在这篇关于[Universal React](https://blog.oyyd.net/post/introduce_universal_javascript_and_its_implementation_in_static_pages)的文章底部的benchmark部分看到柱状图。

在修改中，我加入了如下的语法：

```md
graph.chartName
// JSON data here which will be used by
endgraph
```

其中chartName将被用作chartjs的图表名，如：graph.Bar将使用chartjs中的Bar表。其对应的token形如：

```js
{
  type: 'graph',
  name: 'chartName', // chartn
  data: '...' // expecting JSON string containing `data` and `options` as the parameters of Chart
}
```

而在`graph.chartName`和`endgraph`之间的内容将作为图表的参数。修改过后的marked最终渲染出如下的内容：

```html
<script type="text/chartdata" data-chartname="chartName"
  style="display:none;">
// ...json string here
</script>
```

事实上我们只是渲染了一个script标签来保留图表信息，修改过后的marked并不能让我们在浏览器上直接看到图表。这是由于浏览器的限制，涉及到script的内容在处理时会遇到各种问题，所以在我的处理里，我使用`renderCharts()`方法去文档中搜索这样的标签，从而真正地渲染图表。

## 相关链接

[How to write a very basic compiler](http://programmers.stackexchange.com/questions/165543/how-to-write-a-very-basic-compiler)

[lexers vs parsers](http://stackoverflow.com/questions/2842809/lexers-vs-parsers)
