# 探究JavaScript上的编译器 —— nunjucks

2016年01月12日

## 写在前面的实践结果

在前面[marked的学习过程](https://blog.oyyd.net/post/javascript_compiler_marked)中，我简单地hack了marked来绑定了chartjs。但对于[nunjucks](https://github.com/mozilla/nunjucks)，我没有想到比较好的实践方式。所以这次我将帮助修复nunjucks上的一些bug来作为本次实践。

到目前为止，已尝试修复的问题有：[#571](https://github.com/mozilla/nunjucks/pull/634), [#332](https://github.com/mozilla/nunjucks/pull/632), [#595](https://github.com/mozilla/nunjucks/pull/631), [#612](https://github.com/mozilla/nunjucks/pull/628), [#317](https://github.com/mozilla/nunjucks/pull/339)

## nunjucks的代码结构

nunjucks的整体代码结构如下：

![nunjucks](/static/posts/javascript-compiler/nunjucks.png)

接下来再让我们看看每一部分的作用。

### Lexer

Lexer中最主要的类被命名为Tokenizer，这听起来与Scanner异曲同工。

模板引擎的模板代码可以很容易地被分为成两种，一种将直接用于输出（即Lexer生成的TOKEN\_DATA），另一种则可能有复杂的逻辑于其中。nunjucks在Lexer中有一个in\_code属性用于储存当前的解析状态，并依次进行两套不同的解析规则。

下面展示了一段模板所生成的tokens：

```js
nunjucks.renderString('<h1> Hello, {{ me }}! </h1>', { me: 'oyyd' })

// 生成的tokens:
// { type: 'data', value: '<h1> Hello, ', lineno: 0, colno: 0 }
// { type: 'variable-start', value: '{{', lineno: 0, colno: 12 }
// { type: 'whitespace', value: ' ', lineno: 0, colno: 12 }
// { type: 'symbol', value: 'me', lineno: 0, colno: 13 }
// { type: 'whitespace', value: ' ', lineno: 0, colno: 15 }
// { type: 'variable-end', value: '}}', lineno: 0, colno: 16 }
// { type: 'data', value: '! </h1>', lineno: 0, colno: 16 }
```

Tokenizer只是将源码转换成tokens供其它代码使用。Tokenizer碰到什么字符就会试着把它转换成token，它不会参与任何高层次的逻辑，比如不会检查“{{”和“}}”是否配对。这一检查实际上是在Parser中进行的。

### Parser

Parser实际上是对tokens进行处理，以保证代码的语法规则合法，并据此生成由node组成的AST。

比如当出现“{{”时（TOKEN\_BLOCK\_START），Parser就会尝试在剩余的tokens中寻找“}}”（TOKEN\_BLOCK\_END）。如果没有找到，则Parser会认为代码不符合语法规则，从而抛出异常。

这里非常值得一提的是AST的生成方式。我们先来看看nunjucks尝试解析`or`的方法，注意代码中的注释：

```js
// ...
parseOr: function() {
    var node = this.parseAnd(); // 注意这里
    while(this.skipSymbol('or')) {
        var node2 = this.parseAnd(); // 注意这里
        node = new nodes.Or(node.lineno,
                            node.colno,
                            node,
                            node2);
    }
    return node;
},
// ...
```

我们可以看出在解析`or`之前，Parser首先会尝试解析`and`。而尝试解析`and`的代码如下：

```js
// ...
parseAnd: function() {
    var node = this.parseNot(); // 注意这里
    while(this.skipSymbol('and')) {
        var node2 = this.parseNot(); // 注意这里
        node = new nodes.And(node.lineno,
                             node.colno,
                             node,
                             node2);
    }
    return node;
},
// ...
```

和而如果你去看Parser尝试解析`not`的代码则会发现`parseNot`又会尝试先去解析其他语法。仔细思考一下`or`、`and`和`not`的关系你会发现他们是按照自己在语法中的优先级先后进行的，即Parser会优先尝试寻找高优先级的语法标识。并且对于AST来说，通常高优先级的语法只会是低优先级语法的子孙节点，比如对于：

```js
a and b or c
```

它的AST中`and`会是`or`的左子节点，即便调换他们的位置:

```js
a or b and c
```

`and`仍旧是`or`的子节点，只不过变成了右子节点。

通过这样的做法，Parser将所有的tokens整合成了一棵树，而这棵树的根节点是全局只应有一个的`Root`。

如果你有兴趣了解得更仔细的话，可以看看下面的这个由Parser生成的AST。下面的模板代码：

```html
<p>
  Hi, I'm
  {%if name and isNameValid or forceShowName%}
    <span>{{name}}</span>
  {%endif%}
</p>

```

生成的AST如下（注释为节点类型）：

```js
{ parent: undefined, // Root
  lineno: 0,
  colno: 0,
  children:
   [ { parent: undefined, // Output
       lineno: 0,
       colno: 0,
       children:
        [ { lineno: 0, colno: 0, value: '<p>\n  Hi, I\'m\n  ' }, // TemplateData
          [length]: 1 ] },
     { lineno: 2, // If
       colno: 2,
       cond:
        { lineno: 2, // Or
          colno: 5,
          left:
           { lineno: 2, // and
             colno: 5,
             left: { lineno: 2, colno: 5, value: 'name' }, // Symbol
             right: { lineno: 2, colno: 14, value: 'isNameValid' } }, // Symbol
          right: { lineno: 2, colno: 29, value: 'forceShowName' } }, // Symbol
       body:
        { parent: undefined, // NodeList
          lineno: 0,
          colno: 0,
          children:
           [ { parent: undefined, // Output
               lineno: 2,
               colno: 42,
               children: [ { lineno: 2, colno: 42, value: '\n    <span>' }, [length]: 1 ] }, // TemplateData
             { parent: undefined, // Output
               lineno: 3,
               colno: 10,
               children: [ { lineno: 3, colno: 10, value: 'name' }, [length]: 1] }, // Symbol
             { parent: undefined, // Output
               lineno: 3,
               colno: 14,
               children: [ { lineno: 3, colno: 14, value: '</span>\n  ' }, [length]: 1 ] }, // TemplateData
             [length]: 3 ] },
       else_: null },
     { parent: undefined, // Output
       lineno: 4,
       colno: 7,
       children: [ { lineno: 4, colno: 7, value: '\n</p>' }, [length]: 1 ] }, // TemplateData
     [length]: 3 ] }
```

### Compiler

Compiler使用AST生成中间代码。nunjucks运行在node上，所以nunjucks生成的中间代码自然就是JavaScript代码，这也意味着nunjucks可以运行在浏览器上。

AST中的nodes会被用来生成JavaScript代码片段，上文Parser中的那段模板代码生成的中间代码如下:

```js
function root(env, context, frame, runtime, cb) {
  var lineno = null;
  var colno = null;
  var output = "";
  try {
    var parentTemplate = null;
    output += "<p>\n  Hi, I'm\n  ";
    if (runtime.contextOrFrameLookup(context, frame, "forceShowName") || runtime.contextOrFrameLookup(context, frame, "name") && runtime.contextOrFrameLookup(context, frame, "isNameValid")) {
      output += "\n    <span>";
      output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
      output += "</span>\n  ";;
    }
    output += "\n</p>";
    if (parentTemplate) {
      parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
    } else {
      cb(null, output);
    };
  } catch (e) {
    cb(runtime.handleError(e, lineno, colno));
  }
}
return {
  root: root
};
```

在Environment中，中间代码被作为函数体用来生成一个函数：

```js
var props = new Function(
  codeString // 中间代码
);
```

并且中间代码生成的函数将是个纯函数，传入同样的参数给它会得到同样的结果，这也就意味着在nunjucks中，编译的结果（到Compiler这一步的结果）可以被缓存起来，供以后直接使用，而不需要每次都进行编译。保存完编译结果以后以后，我们就不再需要模板了，而可以直接使用编译结果以提高性能并缩小浏览器上nunjucks文件的大小（即使用nunjucks-slim.js$sidenote(现在这个时间点nunjucks.min.js文件大小为69KB,nunjucks-slim.min.js大小为24KB)）。这就是nunjucks中的precompile特性，也是提高模板引擎性能的关键。

### Context && Environment && Template

到目前为止，有了中间代码以后，我们只要传入参数就可以生成目标代码(HTML)了。而从外部传入的参数分为两种，上下文环境（渲染过程中直接使用到的变量等）储存在Context中，而配置等参数将被储存在Environment中。而Template最主要的目的则是组合使用Environment，其作用可以简单地理解为：

```js
return root( // root为中间代码生成的函数
  ctx, // 上下文环境
  env // 配置等
);

```

nunjucks提供给开发者的api和配置的相关代码大多应该可以在这里找到。

至此主要的编译过程也就结束了。

## 其他

事实上nunjucks还有不少高级特性值得探讨，比如async（transformer.js），它会改变parser的结构。这些内容就留待以后再探讨吧。
