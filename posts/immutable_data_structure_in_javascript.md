# Javascript中的不可变（immutable）数据结构
$publicdate(2015年10月6日)

__前言__

[James Long](http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript)
的这篇文章对在javascript中使用
不可变数据结构的情况进行了阐述，看完之后我发现里面的不少
话都说到我的心坎里去了。这里我会阐述一些我对此的一些的想法，
并尝试总结一下文中的部分想法，做一个简单的
总结（尽可能在十数分钟的阅读内了解内容并对此留下一个较为深刻印象）。

下文将“不可变的数据结构”简称为“immutable”，将leebyron写的库immutable称为“immutablejs”。

## 什么是immutable?

引用immutablejs文档上的话，并夹杂一些我自己的解释，
即“一旦创建后便不可再发生改变的数据结构”，
“因为原来的数据一旦创建创建后便不可发生
改变，__所以当你进行改变数据的操作时，实际上是替换掉原来的整个数据__
（因为你不能改变原来数据中的某一部分）。并且这种做法会
带来各种好处”。

再让我们来看一下immutablejs文档上的例子：

```js
var Immutable = require('immutable');
// map1是一个Map结构的数据
var map1 = Immutable.Map({a:1, b:2, c:3});
// 把map2赋值成一个“改变过的”map1
var map2 = map1.set('b', 50);
// 结果是map1仍旧是map1，它不会发生改变，
// 而map2变成了“改变后的map1”
map1.get('b'); // 2
map2.get('b'); // 50
// 并且 map1 !== map2。后面的例子也会利用到这一点
```

代码中的注释更确切地说应该是“map1所引用的数据对象
不会发生改变”，因为你仍旧可以改变
map1变量所指向的数据。immutable不同于`const`。

## 为什么需要immutable？

### 1.Immutable可以简化我们对数据的使用

当你在使用React（flux）或是Angular等框架时，你会绑定视图和你的
数据，好让视图跟随数据发生改变。如果数据没有发生变化，
那我们也就不需要重新渲染视图，否则会浪费性能。

一个最清晰的例子便是React的class中的`shouldComponentUpdate`方法。
每次尝试改变数据后，React都会带着新数据调用这一方法。只要我们在这个方法中返回false，
那React就不会重新进行渲染。

那么问题在于：在我们决定要不要重新渲染数据时，
我们怎么知道我们的数据到底有没有发生变化？

如果我们需要比对的数据是Number, String, Boolean这样
的简单数据类型的话，我们很容易通过全等来判断数据
是否发生变化：

```js
var state = true;
var newState = false;
if (state !== newState){
  // 重新渲染视图的代码
}
```

但如果你的数据是原生可变的Object（或Array）,
像下面这样的情况：

```js
var state = {count: 0};
var newState = {count: 0};
if (state !== newState){
  // 因为`state`和`newState`的引用是不同的，所以
  // 重新渲染视图的代码一定会执行
}
// 或是
var state = {count: 0};
var newState = state;
newState.count = 1;
if (state !== newState) {
  // 因为`state`和`newState`的引用是相同的，所以
  // 重新渲染视图的代码一定不会执行  
}
```

你就没办法通过全等来判断数据是否发生了
改变。你需要遍历这个对象上的属性（或数组中的元素）
来判断是否发生了改变（注意下面的例子并不完备）：

```js
var state = {count: 0};
var newState = {count: 0};
var isDataChanged = false;
for(var key in newState){
  if(newState.hasOwnProperty(key)
    && newState[key] !== state[key]){
      isDataChanged = true;
      break;
    }
}

if (isDataChanged){
  // 执行重新渲染视图的代码
}
```

对于上面这个例子，如果对象的属性（或是数组的
元素）也是可变的数据类型的话，那你就需要递归地
检验每一个属性（元素）及其子属性（元素）。
这一操作的复杂程度和其消耗可想而知。

但如果你使用了immutablejs中的数据结构，你就可以很轻松的达成这一目的：

```js
var Immutable = require('immutable');
var state = Immutable.Map({count: 0});
var newState = state.set('count', 1);
if (state !== newState){
  // 重新渲染视图
}
```

### 2.使用immutable性能更好

同上文所述，如果我们能够快速有效的判断数据是否发生了变化，从而避免不必要的渲染，那我们
的App就会有更好的性能。并且像是immutablejs这样的库
一般在实现细节上都会更加优秀，以让变动数据的操作本身有更好的性能
$sidenote(下面这段引用摘自James的原文)：

  > ...it implements fully persistent data structures from scratch using advanced things like tries to implement structural sharing. All updates return new values, but internally structures are shared to drastically reduce memory usage （and GC thrashing).

### 3.从函数式编程的角度来讲，immutable优于mutable

因为immutable不会背地里改变数据。

## 不使用immutable的理由

在实现immutabl(或达到相同目的)的库中:

无疑[immutablejs](https://facebook.github.io/immutable-js/)是该类项目中最流行的。

而[seamless-immutable](https://github.com/rtfeldman/seamless-immutable)则轻量得多，
但它在使用上更接近原生的javascript数据结构。

使用React的项目则可以直接利用[immutability-helpers](https://facebook.github.io/react/docs/update.html)
来达到类似的效果。

使用immutable有种种的好处，但至少直到现在为止，它
在使用javascript的生产环境中，似乎也还没有很流行。__究其原因，一是现在大部分的web app规模相对较小，
不能很好体现出immutable的优势；再者便是使用像immutablejs这样非轻量级的库会增加程序的复杂程度，
因为其数据结构及使用方法与javascript中原生的数据结构相差甚远__。

对于我自己的体会来说，我们在公司里用React+Redux重构了原来的大部分代码，并开发新功能。
而在这一过程中我们没有加入immutablejs，即便Redux使用全等来判断是否要重新渲染，强制要求使用
符合immutable特点的数据结构。
其原因完全同前面所述。单从主观感觉上来讲，引入immutablejs比引入React给程序员带来的负担要更大，
而且使用immutablejs还要面对绝大多数不使用immutablejs的第三方的问题，你可能要写大量的代码
来在immutable和mutable类型的数据结构之间进行转换。

所以我们最后只使用了React自带addons中的immutability-helpers来实现这一目的，虽然这一小工具
从数据结构本身并不会给我们带来性能提升，但它帮助我们少写了很多代码，而React也能够利用全等来
简单地判断数据是否发生了改变。

## 结论

immutable可以简化数据操作上的一些问题，提高应用的性能。但我们更需要根据实际情况来考虑
其带来的副作用，根据情况做出选择。
