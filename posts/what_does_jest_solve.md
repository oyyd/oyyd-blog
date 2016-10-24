# 用jest进一步简化测试

jest是fb推出的测试代码库，得到了很多人的点赞：

![stagazers.png](/static/posts/jest-repo/stagazers.png)

我理解在javascript的生态上，测试代码库的使用普遍比较稳定，通常是在jasmine和mocha上做选择。那么为什么我们需要一个新的代码库呢？jest又解决了哪些问题呢？

## 简化依赖注入，加快测试编写

在编写测试代码时，面对一些IO类的代码会比较棘手，比如：文件操作，网络请求等。我们可以为测试提供这些环境，比如放置一些为测试准备的文件，为测试环境开启一个模拟服务器等。这种做法能够比较好的测试我们的代码，不仅花费时间的同时，mock一个整体的测试环境也显得非常笨重、冗余。

所以换一个角度来看，如果我们的代码本身不以IO操作为重点的话，我们只要保证调用代码IO的参数符合期望即可。举个例子，如果我们的代码涉及node上的文件操作：

```js
import { readFileSync } from 'fs';

export function getConfig(filePath) {
  return readFileSync(filePath);
}
```

在为`getConfig`编写代码时，那我们可能会想要知道调用`readFileSync`的参数`filePath`是否符合期望。那我们可以让`getConfig`参数接受一个额外的参数，来指定`readFileSync`：

```js
import { readFileSync as _readFileSync } from 'fs';

export function getConfig(filePath, callFun) {
  const readFileSync = callFun || _readFileSync;
  return readFileSync(filePath);
}
```

有了可选的参数`callFun`，我们就可以在测试的时候调用自定义处理来进行模拟：

```js
import { getConfig } from '../config';

describe('callFun', () => {
  it('should return config file content', () => {
    const filePath = '/config.json';

    getConfig(filePath, file => {
      assert(file === filePath);
    });
  });
});
```

你也可以考虑直接为IO封装一层，然后把测试相关的代码放这里面去：

```js
import { readFileSync } from './my_fs';
```

这种做法的__问题__在于：我们需要在代码中加入一些特别为测试环境准备的代码，同时也会影响我们原本的api设计，让代码看起来更加费解。还有一点就是你所有这样的代码都需要这么处理，影响范围比较大。

那么jest是怎么处理这个问题的呢？

jest控制了我们代码中的模块系统，能在我们的`import`和`require`中进行一些额外的处理。这样在测试环境中，我们可以在__不改变原代码__的同时编写mock函数。还是举上面的例子，我们不对原来的`getConfig`注入依赖，也不对`fs`模块做封装：

```js
import { readFileSync } from 'fs';

export function getConfig(filePath) {
  return readFileSync(filePath);
}
```

然后在jest中我们可以这么做：

```js
jest.mock('fs', () => ({
  readFileSync: jest.fn,
}));
import { readFileSync } from 'fs';
import { getConfig } from '../config';

describe('callFun', () => {
  it('should return config file content', () => {
    const filePath = '/config.json';

    getConfig(filePath);

    assert(readFileSync.mock.calls[0][0] === filePath);
  });
});
```

利用jest，我们既不需要修改源代码，也不需要额外写太多代码就可以编写这类测试。jest本身就提供了多种类型的[mock函数](https://facebook.github.io/jest/docs/api.html#mock-functions)，方便我们以各种方式获取函数调用信息或是模拟返回结果，非常之便利。

当然mock代码的可信度还是不及真实操作，这里不再多谈。

## 避免对隐式环境的依赖，编写更加纯粹的单元测试

实际上我们的代码运行总是需要依赖一定的运行环境，而且这个环境往往是隐式、复杂的，也就是难以模拟复现。举个例子，加入我们的代码涉及到了文件操作，那我们编写测试时可能需要模拟文件操作的场景。

```js
// module Student.js
function Student() {};

window.student = new Student();
```

```js
// module a.js
// ...other code
window.student.name = 'liang duan';
// ...other code
```

```js
// module b.js

console.log(student.name)
```

这里在我们`b.js`的代码中，运行环境中有没有引入`a.js`会对代码的运行结果产生影响，自然也会对测试结果产生影响。好的代码会尽量避免这种写法，但我们要如何从技术层面上去避免无意中依赖其他模块中的代码呢？

所以在jest中，你可以将`automock`选项设置为`true`，这就会使得所有模块都在测试中被加载时，只有指定的模块本身的代码会被真正加载，这个模块依赖的其他模块的代码加载的都是mock代码，从而保证你的代码在测试时，真正地没有暗中依赖其他模块。

值得一提的是，`automock`以前是默认开启的，但在最近的版本开始它被默认关闭了，可能也是因此类情况而引发的问题还是比较少，写`jest.unmock`的情况居多。但无论如何，我觉得这还是一个非常cool的特性。

## 集成测试环境

目前关于测试，有各式样的代码库供我们选择。他们大多相似，但又不完全一样。要让测试运行起来，通常我们需要选择并配置一个框架（mocha、jasmine）、一个断言代码库（assert、expect、chai、should）、一个或多个运行环境（浏览器、node、node + jsdom）。虽然需要做的事情差不多，但这些事情总归是需要花时间的。如果你希望你的代码同时运行在node和浏览器环境上，你经常要再多花一点时间来考虑让你已有的测试代码在另一个环境上跑起来。

而jest已经集成好了整个环境，你不需要做太多的事情，可以花更多时间在真正的写测试代码上。虽然jest没办法像karma那样直接跑在浏览器上，但至少可以很方便地跑在node的jsdom上。当然集成也就意味着你会失去了一定的灵活性，但在测试这件事情上，大多数时候比较高层次的抽象还是非常合适的。

总有那么一些时间，你会只想编写测试，不想管其他的那些劳神子（javascript fatigue?）。这时候一个`npm install jest`你就可以开始了。

## 结论

jest很好地。并且jest本身还在不断地丰富，有更多的新功能会被加入进来，其他测试框架上的一些功能应该也会以比较合适的方式被集成进来（test coverage）。
