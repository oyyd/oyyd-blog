# 探究JavaScript上的编译器 —— nunjucks

2016年01月11日

## 写在前面的实践结果

在前面[marked的学习过程](https://blog.oyyd.net/post/javascript_compiler_marked)中，我简单地hack了marked来绑定了chartjs。但[nunjucks](https://github.com/mozilla/nunjucks)的内容，我没有想到比较好的实践方式。所以这次我将帮助修复nunjucks上的一些bug作为这次实践。

到目前为止，已修复的问题有：[#332](https://github.com/mozilla/nunjucks/pull/632), [#595](https://github.com/mozilla/nunjucks/pull/631), [#612](https://github.com/mozilla/nunjucks/pull/628), [#317](https://github.com/mozilla/nunjucks/pull/339)

## nunjucks的代码结构

nunjucks的整体代码结构如下：

// TODO: graph

接下来再让我们看看每一部分的作用。

### Lexer

Lexer中最主要的类被命名为Tokenizer，这听起来与Scanner异曲同工。

模板引擎的模板代码可以很容易地被分为成两部分，一部分将直接用于输出（即Lexer生成的TOKEN\_DATA），另一部分则可能有复杂的逻辑于其中。nunjucks在Lexer中会储存一个in\_code变量用于确认当前的解析状态，并依次进行两套不同的解析规则。

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

Tokenizer只是将源码转换成tokens供其它代码使用。Tokenizer碰到什么字符就会试着把它转换成token，它不会参与任何高层次的逻辑。比如Lexer不会检查“{{”和“}}”是否配对，这一检查实际上是在Parser中进行的。

### Parser

Parser实际上是对tokens进行处理，以保证代码的语法规则合法，并据此生成由node组成的AST。

比如当出现“{{”时（TOKEN\_BLOCK\_START），Parser就会尝试在剩余的tokens中寻找“}}”（TOKEN\_BLOCK\_END）。如果没有找到则Parser会认为代码不符合语法规则，从而抛出异常。

Parser生成三种

TOKEN_DATA ->

```js
buf.push(new nodes.Output(tok.lineno,
                          tok.colno,
                          [new nodes.TemplateData(tok.lineno,
                                                  tok.colno,
                                                  data)]));
```

TOKEN_BLOCK_START -> parseStatement()
TOKEN_VARIABLE_START -> parseExpression()
TOKEN_COMMENT -> skip
others -> fail


parseExpression() -> parseInlineIf() -> ...

一个表达式可能的情况...

a and b or c = ( a and b ) or c

a or b and c = a or ( b and c )

首先尝试寻找低优先级的nodes，因为？

Parser生成AST的例子如下：

// TODO maybe graph here?

```html
<p>
  Hi, I'm
  {%if name and isNameValid or forceShowName%}
    <span>{{name}}</span>
  {%endif%}
</p>

```

```js
// { parent: undefined,
//   lineno: 0,
//   colno: 0,
//   children:
//    [ { parent: undefined,
//        lineno: 0,
//        colno: 0,
//        children:
//         [ { lineno: 0, colno: 0, value: '<p>\n  Hi, I\'m\n  ' },
//           [length]: 1 ] },
//      { lineno: 2,
//        colno: 2,
//        cond:
//         { lineno: 2,
//           colno: 5,
//           left:
//            { lineno: 2,
//              colno: 5,
//              left: { lineno: 2, colno: 5, value: 'name' },
//              right: { lineno: 2, colno: 14, value: 'isNameValid' } },
//           right: { lineno: 2, colno: 29, value: 'forceShowName' } },
//        body:
//         { parent: undefined,
//           lineno: 0,
//           colno: 0,
//           children:
//            [ { parent: undefined,
//                lineno: 2,
//                colno: 42,
//                children: [ { lineno: 2, colno: 42, value: '\n    <span>' }, [length]: 1 ] },
//              { parent: undefined,
//                lineno: 3,
//                colno: 10,
//                children: [ { lineno: 3, colno: 10, value: 'name' }, [length]: 1] },
//              { parent: undefined,
//                lineno: 3,
//                colno: 14,
//                children: [ { lineno: 3, colno: 14, value: '</span>\n  ' }, [length]: 1 ] },
//              [length]: 3 ] },
//        else_: null },
//      { parent: undefined,
//        lineno: 4,
//        colno: 7,
//        children: [ { lineno: 4, colno: 7, value: '\n</p>' }, [length]: 1 ] },
//      [length]: 3 ] }
```

### transformer

async filters

### Compiler

Compiler使用AST生成中间代码:

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

// TODO：check
在Environment中，中间代码被用来生成一个函数：

```js
var props = new Function(
  code // 中间代码
);
```

并且这是个纯函数，传入同样的参数给它会得到同样的结果，这也就意味着在nunjucks中，编译的结果（到Compiler这一步的结果）可以被缓存起来，供以后直接使用，而不需要每次都进行编译。保存完编译结果以后以后，我们就不再需要模板了，而可以直接使用编译结果以提高性能并缩小浏览器上nunjucks文件的大小（即使用nunjucks-slim.js$sidenote(现在这个时间点nunjucks.min.js文件大小为69KB,nunjucks-slim.min.js大小为24KB)）。这就是nunjucks中的precompile特性，也是nunjucks高性能的关键// TO

### Context && Environment && Template

到目前为止，有了中间代码以后，我们只要传入参数就可以生成目标代码了。而从外部传入的参数分为两种，上下文环境（渲染过程中直接使用到的变量等）储存在Context中，而配置等参数将被储存在Environment中。而Template最主要的目的则是组合使用Environment，其作用可以简单地理解为：

```js
return root( // root为中间代码生成的函数
  ctx, // 上下文环境
  env // 配置等
);

```
