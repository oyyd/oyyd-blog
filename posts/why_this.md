#关于这个博客——移Wordpress上的post

$publicdate(2015年1月1日)

__前言：__ 其实直接保留原来wordpress的oyyd.net也是可以的。只是我的阿里云服务器是捡来的（梗自游戏王游星），性能比较差（其实访问量太小，根本没有这个问题）。所以感觉要保留的话，我就得把这个阿里云服务器续个十年八年的，实在是没有必要。另一方面这也不利于我一时间起鬼点子，把blog捣鼓来捣鼓去的。虽然我原来的那些posts也基本没什么营养，但至少我自己总是经常回去翻一翻，所以还是想把他们保留下来。那么就进入正题吧。

##数据库上的wp_posts表

wp_posts表中的字段基本就包含了我们posts的绝大多数内容了，tags，comments等除外。所以我直接把这张表复制进了新的数据库里。下面举出一些我用到的fields:

```
CREATE TABLE `wp_posts` (
  ...
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  ...
) ENGINE=InnoDB AUTO_INCREMENT=593 DEFAULT CHARSET=utf8;
```

其中`post_content` 和 `post_title`就包含了所有的文本内容。$sidenote(test sidenotes`test sidenotes`)由于post_content直接就是HTML标签了，所以我只需要简单地把它插入到document中就能显示了。由于wordpress会把历史版本和草稿等其他东西也一并保存在posts表中，所以我们需要用`post_status`和`post_type`来识别有效的post。因为其他的内容我基本都不需要，所以我只需要保证$sidenote(test sidenotes 2)：

```js
wordpressPost.db.findAll({
  where:{
    postStatus: 'publish',
    postType: 'post'
  }
})
```
 
就能够筛选出所有有效的posts了。

##静态文件（图片）

Wordpress的图片基本上都储存在wordpress/wp-content/uploads文件夹下面，所以我首先把它们复制到了新博客的静态文件路径下。

由于我的wordpress曾经用过ip作为站点名发过post，后来才改成的域名oyyd.net，posts中图片的路径有两种：

```
http://115.29.98.228/wp-content/uploads...和
http://oyyd.net/wp-content/uploads...
```

这里我是在前端进行的处理。我简单地把它们替换成了新博客的静态文件路径：`/static/wp/`。

##post中的代码

我在wordpress中的代码是利用crayon-syntax-highlighter进行书写和渲染的。它会把代码包裹进`<pre>`标签中，并高亮其中的内容。在新博客中，我们需要自己高亮他们。我现在是简单地利用highlight.js，以后可能会换成codemirror。

用highlight.js大概是这种感觉：

```js
var highlightCode = function(codeBlockArr){
  for (var i=0;i<codeBlockArr.length;i++){
    hljs.highlightBlock(codeBlockArr[i]);
  }
};
```

##其他

直接插入HTML的话，post的文本内容换行可能会不正确。所以需要将`\n`替换成`<br/>`。另外我没有引入原来的样式文件，我更倾向于自己去修改他们（然而却一直没有改）。

当前成果大概是这个样子的：

![当前成果](/static/img/2015/06/wordpress_example.png)