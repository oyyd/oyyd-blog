# 推荐React.js Conf 2016中的一些精彩演讲

__前言：__ 在会前，twitter上出现了这样的对话...

![Before everything](/static/posts/react-conf-2016/before-everything.png)

所以你可以预料到今年会上没有特别爆炸性的项目出现，并且关于React Native的话题有很多。我觉得今年话题的核心还是集中于React Native，我也会在这上面啰嗦一些我的想法。

下面我会推荐一些我觉得比较精彩、比较有价值的演讲（由于时间有限我并没有去看lightning talk）。

## React Native相关演讲

### [Nick Schrock - Keynote](https://www.youtube.com/watch?v=MGuKhcnrqGA)

Nick做了今年的开场演讲，而且演讲风格非常逗趣。并且Nick在Facebook的7年中从未写过太多JavaScript，却被选作React会议开场的演讲者。说到这里估计你多多少少也会提起了些兴趣。

Nick的演讲大部分内容主要集中于React Native，他以一个非JavaScript开发者的角度去阐述了React Native所可能带来的价值，我们可以从中提取出这样的观点：

  * React Native并不是跨平台的，但我们却可以在平台之间共用大量代码（Facebook用React Native开发的两款App共享了约85% - 90%的代码）
  * React Native从设计上就发挥了多核的优势
  * 用React Native开发应用（大部分时间）不需要重编译，开发效率高
  * React Native的代码可以在线更新，避免一些不必要的硬发布流程
  * 用React Native开发应用只需要一个统一的团队

当然Nick更多的是在阐述React Native的优点，这些我们多多少少也已经知道了。但如果React Native已经足够优秀的话，那我们应该能在过去的一年里看到更多用React Native开发的应用。这里我从阐述一些我认为的React Native __目前__ 的劣势及容易误解的地方：

  * React Native目前还不够成熟。目前React Native基本上一个月会发release两次，并且Android开发的体验还比不上iOS。

  * 因为React Native的应用还不够广泛，这就意味着相关社区及相关开源项目的支持力度还不够。你碰到一个问题可能会很难google出有效的回答，同时你们也很难靠自己的力量去修复React Native中出现的bug（你们的团队需要同时充分掌握多门语言）。

  * 在不同平台上共享的代码越多，可能意味着我们越没有充分发挥平台的优势和特点（主要是对UI／UE而言）。

  * React Native的开发既不同于Web开发也不同于Native开发，这意味着你目前很难从市场上找到有经验的人。

  * 虽然你们React Native的项目主要需要的是JavaScript开发者，但如果你们想利用React Native开发一款用户体验至上的应用的话，你们还是需要有Android和iOS的开发者作支持（或是JavaScript开发人员也要有一定的Native经验），以便在一个需求不能够通过纯JavaScript的方案解决的时候能退回到Native的解决方案（主要是写一些桥接JavaScript和Native的代码，并不一定需要完全用Native来解决，并且如果社区支持能越来越给力的话，我们需要的Native支持也会越来越少）。

那么是否现在用React Native来开发用于生产环境的App是不是不切实际的呢？从一些公司的实践结果来说是否定的，这里强烈推荐加下来James Ide关于在实践环境中运用React Native的演讲。

### [James Ide - 团队 × 技术](https://youtu.be/2Zthnq-hIXA?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY)

James在Exponent公司里亲历了React Native团队的建设和开发。James本人的工作经历足以证明他是一个优秀的工程师，所以他的演讲和对React Native的看法和经验也是极具参考价值的。

这里另一款强烈推荐的，用React Native开发的优秀的App是Discord。Discord所有的客户端（Web、Mobile、Desktop）都是用JavaScript（React）开发的，并且用户体验极佳。

### [Parashuram N - 在原生应用上发挥Web的发布能力](https://www.youtube.com/watch?v=B8J8xn3pLpk)

React Native上非常有价值的一个特性是在线更新代码，而Parashuram是有效拓展这一特性的[codepush](https://github.com/Microsoft/react-native-code-push)项目的作者。他给我们介绍了如何利用这一工具来发挥React Native的发布能力。

除此之外，Parashuram是微软的员工，他还给我们演示了如何利用visual studio code相关插件简化React Native开发。虽然看起来参加会议的观众大多不使用vscode，有点尴尬，但我本人是非常希望Atom上有类似的、稳定的插件。

## Better React

### [Steve McGuire - 对性能上的妥协说不](https://www.youtube.com/watch?v=kDARP5QZ6nU&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY&index=28)

如果你真的在React开发过程中碰到了性能问题，或是项目本身对性能要求非常苛刻，你们又希望使用React，又或是希望在提高React应用的性能上寻找新思路的话，那我强烈推荐观看本视频。

Steve是Netflix的员工，演讲中他介绍了他们是如何在便宜的30美元的设备上，一步步将用户的输入和应用的响应渲染时间压缩到100ms以内。他们的优化无所不用，对，无所不用。

### [Lin Clark - 以卡通的形式介绍数据处理](https://www.youtube.com/watch?v=WIqbzHdEPVM)及[Jared Forsyth - Redux, Re-frame, Relay, Om/next, 天啊!](https://www.youtube.com/watch?v=-jwQ3sGoiXg&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY&index=22)

Lin以漫画的形式介绍了React上的几个专注于数据处理的框架的思想和异同，而Jared责对有React衍生出的，以及与React持有相同核心思想的框架做了介绍和对比。

这里还强烈推荐James Long关于Redux的一个[视频](https://www.youtube.com/watch?v=BfzjuhX4wJ0)，从中你可能会明白为什么不少人会认为Redux是React社区在2015年中的最佳产物。

### [Ben Alpert - 我们前方还有什么](https://www.youtube.com/watch?v=-RJf2jYzs8A)

Ben介绍了很多当前React体系的不足或是可以改进的地方。

## 其他演讲

除了上面这些两大类内容之外，也有不少有意思的演讲：

### [Jamison Dance - Rethinking All Practices: 用Elm构建应用](https://www.youtube.com/watch?v=txxKx_I39a8&index=31&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY)

你可能跟我一样从未用过Elm，但却经常看到别人谈论Elm。通过这个视频即便我们没有用过Elm也能够了解其中的一些秘密。

如果你连视频也不想看的话，我也有一个更简单粗暴的解释：React ＋ Redux上的所有优秀的特性加起来等于Elm。

这个视频同时也是[gaearon](https://github.com/gaearon)极力推荐的。

### [Syrus Akbary - 非JS服务器上的GraphQL框架](https://www.youtube.com/watch?v=RNoyPSrQyPs&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY&index=29)

这里Syrus指的是python上的GraphQL实现[graphene](https://github.com/graphql-python/graphene)。关于GraphQL要解决的问题和好处也可以选择去看GraphQL的官方文档。

Syrus在GraphQL的实践过程中提出来的一点想法我觉得从另一个角度体现了GraphQL可以给我们带来的好处：服务器端不应该去具体知道客户端到底需要什么结构的数据，客户端的开发人员应该可以自己写query拿自己想要的数据及结构，这样他也就不用在需求变更的时候跑去问后端开发工程师去修改或提供API，从而造成更多的代码发生变动。GraphQL优化了我们开发的流程。

### [Helena Milosevic - 揭开技术招聘流程的面纱](https://www.youtube.com/watch?v=N233T0epWTs&list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY&index=5)

Helena是Facebook的HR，你没看错，这确实由HR进行的一次演讲。Helena想我们介绍了Facebook招聘技术岗位员工时的基本流程，事实上大体流程和国内的大公司进行的招聘流程还是非常相似的，比较特别的是有一个需要应聘者在白板上和面试官进行交流的环节。仔细想一下这个流程我觉得还是非常有意义的，因为应聘者在白板上阐述自己想法的过程会不仅考验他的专业知识，同时也体现了他和其它员工进行分享和讨论的能力。本身这类事情也是现实工作中非常有可能会出现的环节，是非常贴合实际的。

最后Helena还分享了一句非常在理的话：

Do or not do. Never try.

与诸君共勉。
