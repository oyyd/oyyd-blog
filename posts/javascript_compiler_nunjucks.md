# 探究JavaScript上的编译器 —— nunjucks

2016年01月04日

## 写在前面的实践结果

在前面[marked的学习过程](TODO)中，我简单地hack了marked来绑定了chartjs。而nunjucks

## Lexer

Tokenizer == Scanner

```
in_code ?
  TOKEN_STRING
  TOKEN_WHITESPACE
  TOKEN_BLOCK_END
  TOKEN_VARIABLE_END
  TOKEN_REGEX
  ...
:
  TOKEN_BLOCK_START
  TOKEN_VARIABLE_START
  TOKEN_COMMENT
  TOKEN_DATA
```

```js
nunjucks.renderString('<h1> Hello, {{ me }}! </h1>', { me: 'oyyd' })

// { type: 'data', value: '<h1> Hello, ', lineno: 0, colno: 0 }
// { type: 'variable-start', value: '{{', lineno: 0, colno: 12 }
// { type: 'whitespace', value: ' ', lineno: 0, colno: 12 }
// { type: 'symbol', value: 'me', lineno: 0, colno: 13 }
// { type: 'whitespace', value: ' ', lineno: 0, colno: 15 }
// { type: 'variable-end', value: '}}', lineno: 0, colno: 16 }
// { type: 'data', value: '! </h1>', lineno: 0, colno: 16 }
// <h1> Hello, oyyd! </h1>
```

在Lexer中，Tokenizer只是将源码转换成tokens供其它代码使用。Tokenizer碰到什么字符就会试着把它转换成token，它不会参与任何高层次的逻辑，比如要检查“{{”和“}}”是否配对出现是在Parser中进行的，而不是Lexer。

## Parser

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

Parser生成AST：

// TODO maybe graph here?

```js
`<p>
  Hi, I'm
  {%if name and isNameValid or forceShowName%}
    <span>{{name}}</span>
  {%endif%}
</p>`

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

## transformer

async filters

## Compiler

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

并且这是个纯函数，传入同样的参数给它会得到同样的结果，这也就意味着在nunjucks中，编译的结果（到Compiler这一步的结果）可以被缓存起来，供以后直接使用，而不需要每次都进行编译。保存完编译结果以后以后，我们就不再需要模板了，而可以直接使用编译结果以提高性能并缩小浏览器上nunjucks文件的大小（即使用nunjucks-slim.js$sidenote(现在这个时间点nunjucks.min.js文件大小为69KB,nunjucks-slim.min.js大小为24KB)）。这就是nunjucks中的precompile特性，也是nunjucks高性能的关键// TODO

## Environment && Template
