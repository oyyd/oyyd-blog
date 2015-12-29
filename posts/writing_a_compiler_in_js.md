# 探究JavaScript上的编译器 —— marked

__前言：__

编译这个话题在JavaScript上很少出现，如果你也用google去搜过相关的话题的话，会发现很难找到能帮助我们比较好入门的内容。而与之相对的是，很多的库和特性的实现都离不开编译这一流程，我们去看一些开源的JavaScript代码时也经常会看到Lexer，Parser，Compiler，AST等东西。如果没有相关知识，那看这些代码时经常会一头雾水。

实际上学习这部分内容时，可能阅读[书籍](http://www.amazon.com/dp/0321486811/?tag=stackoverfl08-20)是最合适的。因为编译的基本原理相近，也没有随时间推移而发生大的改变，经典的书籍依旧非常适用。但这里将尝试通过一些开源项目的代码来学习相关内容，这种方式虽然很容易遗漏不少内容，但却也更容易学习到开发实践常用的编译，以及了解不同环境下的编译过程的设计。

但这个话题本身涉及的范围较广，内容较深，所以对这些内容的学习将通三个项目的源码进行，它们分别是：[marked](https://github.com/chjj/marked) —— 将markdown文本转换成可供浏览器使用的HTML标签, [nunjucks](https://github.com/mozilla/nunjucks/) —— 模板引擎和[Jison](http://zaach.github.io/jison/) —— 通用的parser生成器，三部分进行。

这次让我们从marked开始。

## 原理

## marked中的代码结构

marked的目的是根据输入的markdown文本来输出可供浏览器解析的HTML内容，藉由：

```markdown
# 探究JavaScript上的编译器 —— marked

编译这个话题在JavaScript上很少出现...
```

生成：

```html
<h1>探究JavaScript上的编译器 —— marked</h1>
<p>
  编译这个话题在JavaScript上很少出现...
</p>
```

编译目标的不同会直接使得我们代码结构大相径庭。所以对任何编译相关的代码，时刻明确我们的设计的目的可以很好地帮助我们理解代码。

marked由三部分组成，分别是: Lexer和InlineLexer、Parser、Renderer。

TODO: graph

其中Lexer会处理最原始的文本，它将文本处理、抽象，提供tokens供Parser使用；Renderer提供一组api供Parser调用，以生成HTML；Parser对Lexer提供的tokens进行进一步处理，并据此调用Renderer中的api生成最终的HTML字符串。

### Lexer

Lexer用来将源码转换成tokens供Parser使用，其表现如下：

```js
import marked from 'marked';

const tokens = marked.Lexer.lex(`
  # title

  content
`);

// [ { type: 'heading', depth: 1, text: 'title' },
//   { type: 'paragraph', text: '  content' },
//   links: {} ]
```

marked中还有InlineLexer，它的整体作用和Lexer一样，只不过InlineLexer是用于处理诸如：`__strong__`、`~~line-through~~`这样的内联文本。

### Renderer

在Parser之前，我们先来看看Renderer的表现。

## 扩展marked

## demo

## 相关链接

[How to write a very basic compiler](http://programmers.stackexchange.com/questions/165543/how-to-write-a-very-basic-compiler)

[lexers vs parsers](http://stackoverflow.com/questions/2842809/lexers-vs-parsers)

---

Understand Parser

Provide some basic principles
