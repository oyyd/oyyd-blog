require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var main = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	    var server;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _applyStatic2.default)(app);

	          case 2:

	            // hsts
	            applyHSTS(app);

	            // page router
	            app.use('/', _router2.default);

	            server = null;


	            server = _http2.default.createServer(app);

	            server.listen(port);

	            console.log('server running on ' + port); // eslint-disable-line

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function main() {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _http = __webpack_require__(4);

	var _http2 = _interopRequireDefault(_http);

	var _applyStatic = __webpack_require__(5);

	var _applyStatic2 = _interopRequireDefault(_applyStatic);

	var _router = __webpack_require__(25);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	var port = 8001;
	var app = (0, _express2.default)();

	function applyHSTS(application) {
	  if (false) {
	    return;
	  }

	  application.use('/', function (req, res, next) {
	    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	    return next();
	  });
	}

	main().catch(function (err) {
	  setTimeout(function () {
	    throw err;
	  });
	});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var applyStatic = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(app) {
	    var sitemap, feed, xmlList;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _getSiteMap2.default)();

	          case 2:
	            sitemap = _context.sent;
	            feed = (0, _getFeeds2.default)();
	            xmlList = {
	              sitemap: sitemap, feed: feed
	            };

	            // show the ownership to google webmaster tools

	            app.get('/google38940b23fa0e04ca.html', _express2.default.static((0, _path.join)(prefix)));

	            (0, _applyDEVServer2.default)(app);

	            Object.keys(xmlList).forEach(function (name) {
	              app.get('/dist/' + name + '.xml', function (req, res) {
	                res.set('Content-Type', 'text/xml');
	                res.send(xmlList[name]);
	              });
	            });

	            STATIC_PATHS.forEach(function (path) {
	              return applyPath(app, path);
	            });

	          case 9:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function applyStatic(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _path = __webpack_require__(6);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(7);

	var _compression2 = _interopRequireDefault(_compression);

	var _getSiteMap = __webpack_require__(8);

	var _getSiteMap2 = _interopRequireDefault(_getSiteMap);

	var _getFeeds = __webpack_require__(12);

	var _getFeeds2 = _interopRequireDefault(_getFeeds);

	var _applyDEVServer = __webpack_require__(19);

	var _applyDEVServer2 = _interopRequireDefault(_applyDEVServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	var STATIC_PATHS = ['/dist', '/static', '/posts', '/static_lib'];
	var prefix = process.cwd();

	function applyPath(app, path) {
	  app.use(path, (0, _compression2.default)());
	  app.use(path, _express2.default.static((0, _path.join)(prefix, path)));
	}

	exports.default = applyStatic;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("compression");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sitemap = __webpack_require__(9);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	var _CONSTANTS = __webpack_require__(10);

	var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

	var _posts = __webpack_require__(11);

	var _posts2 = _interopRequireDefault(_posts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // server


	var hostname = _CONSTANTS2.default.BLOG.ORIGIN;
	var staticPages = ['/', '/about'];
	var postPages = _posts2.default.map(function (item) {
	  return '/post/' + item.fileName;
	});

	exports.default = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', new Promise(function (resolve, reject) {
	              var sitemap = _sitemap2.default.createSitemap({
	                hostname: hostname,
	                urls: staticPages.concat(postPages).map(function (url) {
	                  return {
	                    url: url
	                  };
	                })
	              });

	              sitemap.toXML(function (err, xml) {
	                if (err) {
	                  reject(err);
	                  return;
	                }

	                resolve(xml);
	              });
	            }));

	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  function getSiteMap() {
	    return _ref.apply(this, arguments);
	  }

	  return getSiteMap;
	}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("sitemap");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  BLOG: {
	    ORIGIN: 'https://blog.oyyd.net'
	  },
	  DISQUS: {
	    ARTICLE_ID_PREFIX: 'oyyd_blog_article_',
	    SHORT_NAME: 'oyyd',
	    DEFAULT_IDENTIFIER: 'oyyd-blog_default',
	    DEFAULT_TITLE: 'oyyd-blog'
	  }
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable */
	exports.default = [{
	  fileName: 'explore_code_reloading_in_server_side',
	  title: '在redux上探索无需刷新前端页面的后端开发体验',
	  publicDate: '2017年01月15日',
	  description: '熟悉react开发的人，或多或少会多听过甚至尝试过react-hot-loader，并为之眼前一亮。现在让我们放眼前后端开发，假如我们在同时进行前后端的代码开发，我们有没有可能能够不刷新页面呢？'
	}, {
	  fileName: 'what_does_jest_solve',
	  title: '用jest进一步简化测试',
	  publicDate: '2016年10月24日',
	  description: 'jest是fb推出的测试代码库，得到了很多人的点赞。在javascript的生态上，测试代码库的使用普遍比较稳定，通常是在jasmine和mocha上做选择。那么为什么我们需要一个新的代码库呢？jest又解决了哪些问题呢？'
	}, {
	  fileName: 'reactjs_conf_2016_recommendation',
	  title: '推荐React.js Conf 2016中的一些精彩演讲',
	  publicDate: '2016年03月16日',
	  description: '今年会上没有特别爆炸性的项目出现，并且关于React Native的话题有很多。下面我会推荐一些我觉得比较精彩、比较有价值的演讲。'
	}, {
	  fileName: 'how_to_split_your_code_in_webpack',
	  title: '使用webpack分割代码的思路',
	  publicDate: '2016年01月18日',
	  description: '把所有的东西都打包进一个文件的做法不仅简单而且利于缓存。但代码的增长和非wifi的网络环境会使得资源加载时间显得更加不可接受。好在webpack提供了一些强大的特性来帮助我们解决这一问题。'
	}, {
	  fileName: 'javascript_compiler_nunjucks',
	  title: '探究JavaScript上的编译器 —— nunjucks',
	  publicDate: '2016年01月12日',
	  description: '这次的编译器是模板引擎nunjucks，并且我将尝试修复nunjucks上的bug作为本次实践。'
	}, {
	  fileName: 'javascript_compiler_marked',
	  title: '探究JavaScript上的编译器 —— marked',
	  publicDate: '2016年01月04日',
	  description: '现在可能很难找到适合入门的编译相关材料，但与之相对的是，很多的库和特性的实现都离不开编译这一流程。我对这些内容的学习将通过：marked，nunjucks和Jison三个项目的源码进行。'
	}, {
	  fileName: 'best_template_engine_in_node_js',
	  title: '探究用ES6 template strings替代前后端模板引擎',
	  publicDate: '2015年12月16日',
	  description: '模板引擎是其最主要的目的是拼接字符串。没有模板引擎我们当然也可以拼接字符串，只不过这一过程会很痛苦。而template strings本身就是为了解决这一问题而设计的，而tagged template strings又足够帮助我们实现模板引擎的功能。下文将探讨用ES6 template strings替代模板引擎的可行性及其优劣。'
	}, {
	  fileName: 'how_does_react_hot_loader_works',
	  title: '探究Webpack中的HMR(hot module replacement)',
	  publicDate: '2015年12月04日',
	  description: '什么是HMR？HMR能做什么？我们可以看看react-transform的演示...react-transform的实现是基于webpack-dev-server之上的，这里我将从webpack-dev-server和React两方面简单总结HMR的实现原理。'
	}, {
	  fileName: 'introduce_universal_javascript_and_its_implementation_in_static_pages',
	  title: ' Universal(Isomorphic) JavaScript在React上的应用',
	  publicDate: '2015年11月26日',
	  description: 'React中的renderToString方法允许我们在服务器上渲染React部件，这点不仅可以帮助我们解决一些会出现在单页应用(SPA)上的问题，它甚至还允许我们将React用作模板引擎（template engine）来使用。下文还将附带一个简单的benchmark来对比React与传统模板引擎之间性能...'
	}, {
	  fileName: 'immutable_data_structure_in_javascript',
	  title: ' Javascript中的不可变（immutable）数据结构',
	  publicDate: '2015年10月6日',
	  description: 'Javascript中的不可变（immutable）数据结构可以简化数据操作上的一些问题，提高应用的性能。这里会举几个例子来介绍immutable在React应用上所能发挥的作用。'
	}, {
	  fileName: 'why_i_choose_react_rather_than_angular_in_our_company',
	  title: ' 为什么我选择了React来重构我们的前端',
	  publicDate: '2015年8月28日',
	  description: '我们公司和其他大多数初创公司一样，需要开始真正地正视前端开发中的问题，并进行重构时，我在Angular和React中选择了React。我的理由如下...'
	}];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getContent;

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _fs = __webpack_require__(13);

	var _fs2 = _interopRequireDefault(_fs);

	var _crypto = __webpack_require__(14);

	var _crypto2 = _interopRequireDefault(_crypto);

	var _moment = __webpack_require__(15);

	var _moment2 = _interopRequireDefault(_moment);

	var _rss = __webpack_require__(16);

	var _rss2 = _interopRequireDefault(_rss);

	var _translate = __webpack_require__(17);

	var _translate2 = _interopRequireDefault(_translate);

	var _posts = __webpack_require__(11);

	var _posts2 = _interopRequireDefault(_posts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AUTHOR = 'oyyd';
	var SITE_URL = 'https://blog.oyyd.net';
	var FEED_URL = SITE_URL + '/dist/feed.xml';

	var POST_PREFIX = _path2.default.resolve(process.cwd(), './posts');

	function getPostUrl(fileName) {
	  return SITE_URL + '/post/' + fileName;
	}

	function getPostContent(fileName) {
	  var filePath = _path2.default.join(POST_PREFIX, fileName);
	  return _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
	}

	function getContent() {
	  var feed = new _rss2.default({
	    title: AUTHOR,

	    // jscs:disable
	    feed_url: FEED_URL,
	    site_url: SITE_URL
	  });

	  _posts2.default.slice(0, 5).map(function (item) {
	    var content = getPostContent(item.fileName + '.md');
	    var htmlContent = (0, _translate2.default)(content);

	    var md5 = _crypto2.default.createHash('md5');
	    var guid = md5.update(item.fileName).digest('hex');

	    return {
	      guid: guid,
	      title: item.title,
	      description: htmlContent,
	      url: getPostUrl(item.fileName),
	      date: (0, _moment2.default)(item.publicDate, 'YYYY年MM月DD日')
	    };
	  }).forEach(function (feedItem) {
	    feed.item(feedItem);
	  });

	  return feed.xml(true);
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("moment");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("rss");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _markedChartjsBinding = __webpack_require__(18);

	function initCommands() {
	  var commands = [];

	  commands.push({
	    reg: /\$sidenote\((.*?)\)/,
	    handler: function () {
	      var sideNoteCount = 0;
	      return function (content) {
	        sideNoteCount++;
	        return '<sup id="' + sideNoteCount + '" class="margin-toggle' + (' sidenote-number">' + sideNoteCount + '</sup>') + ('<span for="' + sideNoteCount + '" class="mdl-tooltip sidenote">' + content + '</span> ');
	      };
	    }()
	  });

	  commands.push({
	    reg: /\$publicdate\((.*?)\)/,
	    handler: function handler(content) {
	      return content;
	    }
	  });

	  return commands;
	}

	function translate(content) {
	  var commands = initCommands();

	  var result = (0, _markedChartjsBinding.marked)(content);
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var command = _step.value;

	      var regResult = command.reg.exec(result);
	      while (regResult) {
	        var match = regResult[0];
	        var text = regResult[1];
	        result = result.replace(match, command.handler(text));
	        regResult = command.reg.exec(result);
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return result;
	}

	exports.default = translate;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("marked-chartjs-binding");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = apply;
	function apply(app) {
	  if (true) {
	    return;
	  }

	  var webpackMiddleware = __webpack_require__(20);
	  var webpackHotMiddleware = __webpack_require__(21);
	  var browserDEVConfig = __webpack_require__(22);
	  var webpack = __webpack_require__(23);

	  var compiler = webpack(browserDEVConfig);

	  app.use(webpackMiddleware(compiler, {
	    publicPath: browserDEVConfig.output.publicPath,
	    log: function log() {}
	  }));

	  app.use(webpackHotMiddleware(compiler));
	}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint-disable */
	var path = __webpack_require__(6);
	var webpack = __webpack_require__(23);

	var ExtractTextPlugin = __webpack_require__(24);

	module.exports = {
	  target: 'web',
	  devtool: 'source-map',
	  debug: true,
	  watch: true,
	  entry: {
	    browser_bundle: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'babel-polyfill', './src/client/bootstrap.js']
	  },
	  output: {
	    path: path.join(__dirname, '../dist'),
	    publicPath: '/dist',
	    filename: '[name].js'
	  },
	  module: {
	    loaders: [{
	      test: /\.js?$/,
	      loaders: ['babel?' + JSON.stringify({
	        "presets": ["es2015"],
	        "plugins": ["transform-react-jsx", "transform-async-to-generator"]
	      })],
	      exclude: /node_modules/
	    }, {
	      test: /\.less$/,
	      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
	    }] },
	  plugins: [new ExtractTextPlugin('./style.css', {
	    allChunks: true
	  }), new webpack.HotModuleReplacementPlugin({ quiet: true })]
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("webpack");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _page = __webpack_require__(26);

	var _page2 = _interopRequireDefault(_page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function response(res) {
	  res();
	}

	var renderPost = _page2.default.bind(null, response, false);

	var renderPage = _page2.default.bind(null, response, true);

	var router = new _express2.default.Router();

	router.get('/post/:name', renderPost);

	router.use(renderPage);

	exports.default = router;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getPageRender;

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(28);

	var _reactRedux = __webpack_require__(29);

	var _getPostContent = __webpack_require__(30);

	var _getPostContent2 = _interopRequireDefault(_getPostContent);

	var _generateRoutes = __webpack_require__(32);

	var _createStore = __webpack_require__(45);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _posts = __webpack_require__(11);

	var _posts2 = _interopRequireDefault(_posts);

	var _actions = __webpack_require__(49);

	var _reactRouter = __webpack_require__(44);

	var _escapeJSONString = __webpack_require__(50);

	var _escapeJSONString2 = _interopRequireDefault(_escapeJSONString);

	var _createPage = __webpack_require__(51);

	var _createPage2 = _interopRequireDefault(_createPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO: a better 404 response
	var NOT_FOUND_CONTENT = 'not found'; // server


	function transformPostsData(data) {
	  var hash = {};
	  var item = void 0;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      item = _step.value;

	      hash[item.fileName] = item;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return hash;
	}

	var postsDataHash = transformPostsData(_posts2.default);

	function updatePostStore(store, postData) {
	  return new Promise(function (resolve, reject) {
	    (0, _getPostContent2.default)(postData.fileName).then(function (htmlContent) {
	      var title = postData.title,
	          fileName = postData.fileName;


	      try {
	        store.dispatch((0, _actions.initPost)(title, fileName, htmlContent));
	      } catch (e) {
	        reject(e);
	      }

	      resolve();
	    });
	  });
	}

	function internalErr(res, message) {
	  return res.status(500).send(message);
	}

	function redirectReq(res, path) {
	  return res.redirect(302, path);
	}

	function notFound(res) {
	  return res.status(404).send(NOT_FOUND_CONTENT);
	}

	function renderPage(res, page) {
	  return res.status(200).send(page);
	}

	function getPostPageContent(res, store, postData, props, next) {
	  return updatePostStore(store, postData).then(function () {
	    var initialState = null;

	    try {
	      initialState = (0, _escapeJSONString2.default)(JSON.stringify(store.getState()));
	    } catch (err) {
	      next(err);
	      return;
	    }

	    next(null, (0, _createPage2.default)({
	      initialState: initialState,
	      title: postData.title,
	      content: (0, _server.renderToString)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_reactRouter.RouterContext, props)
	      )),
	      description: postData.description
	    }));
	  }, next).catch(next);
	}

	function getPageRender(callback, isPage, req, res) {
	  var store = (0, _createStore2.default)({}, req.url);
	  var routes = (0, _generateRoutes.generateRouter)(null);
	  var fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
	  var postData = postsDataHash[fileName];

	  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
	    var operator = null;

	    if (error) {
	      operator = internalErr.bind(null, res, error.message);
	    } else if (redirectLocation) {
	      operator = redirectReq.bind(null, res, '' + redirectLocation.pathname + redirectLocation.search);
	    } else if (!renderProps || !isPage && !postData) {
	      operator = notFound.bind(null, res);
	    } else if (isPage) {
	      operator = renderPage.bind(null, res, (0, _createPage2.default)({
	        content: (0, _server.renderToString)(_react2.default.createElement(
	          _reactRedux.Provider,
	          { store: store },
	          _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	        )),
	        initialState: (0, _escapeJSONString2.default)(JSON.stringify(store))
	      }));
	    }

	    if (operator) {
	      callback(operator);
	      return;
	    }

	    operator = getPostPageContent(res, store, postData, renderProps, function (err, pageContent) {
	      callback(err ? internalErr.bind(null, res, err.message) : renderPage.bind(null, res, pageContent));
	    });
	  });
	}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fs = __webpack_require__(13);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _parsePost = __webpack_require__(31);

	var _parsePost2 = _interopRequireDefault(_parsePost);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var prefix = process.cwd();

	// TODO: `SimplePostsCache` will cost too much memory someday
	// TODO: use redis or whatever
	// server
	var SimplePostsCache = {};

	function getPostContent(fileName) {
	  return new Promise(function (resolve, reject) {
	    if (SimplePostsCache[fileName]) {
	      resolve(SimplePostsCache[fileName]);
	      return;
	    }

	    _fs2.default.readFile(_path2.default.join(prefix, 'posts', fileName + '.md'), { encoding: 'utf8' }, function (err, _data) {
	      if (err) {
	        reject(err);
	        return;
	      }

	      var data = (0, _parsePost2.default)(_data);

	      SimplePostsCache[fileName] = data;
	      resolve(data);
	    });
	  });
	}

	exports.default = getPostContent;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parsePost;

	var _translate = __webpack_require__(17);

	var _translate2 = _interopRequireDefault(_translate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function parsePost(rawText) {
	  return (0, _translate2.default)(rawText);
	}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateRoutes = generateRoutes;
	exports.generateRouter = generateRouter;

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _SimpleApp = __webpack_require__(33);

	var _SimpleApp2 = _interopRequireDefault(_SimpleApp);

	var _SimplePost = __webpack_require__(37);

	var _SimplePost2 = _interopRequireDefault(_SimplePost);

	var _SimpleList = __webpack_require__(42);

	var _SimpleList2 = _interopRequireDefault(_SimpleList);

	var _index = __webpack_require__(43);

	var _index2 = _interopRequireDefault(_index);

	var _reactRouter = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateRoutes() {
	  return _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: _SimpleApp2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _SimpleList2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'post/:id', component: _SimplePost2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _index2.default })
	  );
	}

	function generateRouter(history) {
	  var routes = generateRoutes();

	  return _react2.default.createElement(_reactRouter.Router, { history: history, children: routes });
	}

	exports.default = generateRoutes;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(34);

	var _Header2 = _interopRequireDefault(_Header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


	var SimpleApp = function (_Component) {
	  _inherits(SimpleApp, _Component);

	  function SimpleApp(props) {
	    _classCallCheck(this, SimpleApp);

	    return _possibleConstructorReturn(this, (SimpleApp.__proto__ || Object.getPrototypeOf(SimpleApp)).call(this, props));
	  }

	  _createClass(SimpleApp, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'oyyd-blog' },
	        _react2.default.createElement(_Header2.default, null),
	        _react2.default.createElement(
	          'div',
	          { className: 'content' },
	          this.props.children
	        ),
	        this.renderFooter()
	      );
	    }
	  }, {
	    key: 'renderFooter',
	    value: function renderFooter() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'footer' },
	        _react2.default.createElement(
	          'p',
	          null,
	          _react2.default.createElement(
	            'span',
	            null,
	            'Built by '
	          ),
	          _react2.default.createElement(
	            'a',
	            { href: 'https://github.com/oyyd/oyyd-blog' },
	            'oyyd-blog'
	          ),
	          _react2.default.createElement(
	            'span',
	            null,
	            ' and styled by modified '
	          ),
	          _react2.default.createElement(
	            'a',
	            { href: 'https://www.getmdl.io/index.html' },
	            'material-design-lite'
	          ),
	          _react2.default.createElement(
	            'span',
	            null,
	            '.'
	          )
	        )
	      );
	    }
	  }]);

	  return SimpleApp;
	}(_react.Component);

	exports.default = SimpleApp;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(35);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _reactRedux = __webpack_require__(29);

	var _PerspectiveImg = __webpack_require__(36);

	var _PerspectiveImg2 = _interopRequireDefault(_PerspectiveImg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var string = _react2.default.PropTypes.string;


	var ACTIVE_ITEMS = {
	  ABOUT: 'ABOUT',
	  POST_LIST: 'POST_LIST'
	};

	var HEADER_HEIGHT = 200;
	var BG_IMG_WIDTH = 1300;
	var BG_IMG_HEIGHT = 600;
	var BG_IMGS = ['/static/img/app/header-bg/1.png', '/static/img/app/header-bg/2.png', '/static/img/app/header-bg/3.png', '/static/img/app/header-bg/4.png', '/static/img/app/header-bg/5.png'];
	var BG_IMGS_LENGTH = BG_IMGS.length;

	function getActiveItem(path) {
	  switch (path) {
	    case '/about':
	      return ACTIVE_ITEMS.ABOUT;
	    default:
	      return ACTIVE_ITEMS.POST_LIST;
	  }
	}

	var Header = function (_Component) {
	  _inherits(Header, _Component);

	  function Header(props) {
	    _classCallCheck(this, Header);

	    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

	    var randomIndex = Math.round(Math.random() * (BG_IMGS_LENGTH - 1));

	    _this.bgImg = BG_IMGS[randomIndex];

	    _this.state = {
	      windowWidth: 0
	    };

	    _this.handleResizing = _this.handleResizing.bind(_this);
	    return _this;
	  }

	  _createClass(Header, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.$window = (0, _jquery2.default)(window);
	      this.$window.resize(this.handleResizing);
	      this.handleResizing();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.$window.unbind('resize', this.handleResizing);
	    }
	  }, {
	    key: 'handleResizing',
	    value: function handleResizing() {
	      var windowWidth = this.$window.width();

	      this.setState({
	        windowWidth: windowWidth
	      });
	    }
	  }, {
	    key: 'renderNav',
	    value: function renderNav() {
	      var ACTIVE_ITEM = getActiveItem(this.props.path);

	      return _react2.default.createElement(
	        'div',
	        { className: 'nav' },
	        _react2.default.createElement(
	          'div',
	          { className: 'column' },
	          _react2.default.createElement(
	            'a',
	            {
	              className: ACTIVE_ITEM === ACTIVE_ITEMS.POST_LIST ? 'item active' : 'item',
	              href: '/'
	            },
	            'POST LIST'
	          ),
	          _react2.default.createElement(
	            'a',
	            {
	              className: ACTIVE_ITEM === ACTIVE_ITEMS.ABOUT ? 'item active' : 'item',
	              href: '/about', title: 'about me'
	            },
	            'ABOUT'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'links' },
	          _react2.default.createElement(
	            'a',
	            {
	              className: 'header-icon github-link',
	              href: 'https://github.com/oyyd',
	              title: 'github'
	            },
	            _react2.default.createElement('span', { className: 'icon-github' })
	          ),
	          _react2.default.createElement(
	            'a',
	            {
	              className: 'header-icon rss-feed',
	              href: '/dist/feed.xml',
	              title: 'rss feed'
	            },
	            _react2.default.createElement('span', { className: 'icon-feed4' })
	          )
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'header' },
	        _react2.default.createElement(_PerspectiveImg2.default, {
	          src: this.bgImg,
	          containerWidth: this.state.windowWidth,
	          containerHeight: HEADER_HEIGHT,
	          width: BG_IMG_WIDTH,
	          height: BG_IMG_HEIGHT
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: 'hover-content' },
	          _react2.default.createElement(
	            'h1',
	            { className: 'site-name no-deco' },
	            'OYYD BLOG'
	          ),
	          this.renderNav()
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_react.Component);

	Header.propTypes = {
	  path: string
	};

	function mapState(state) {
	  return {
	    path: state.routing.location.pathname
	  };
	}

	var ConnectedHeader = (0, _reactRedux.connect)(mapState)(Header);

	exports.default = ConnectedHeader;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = require("jquery");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _React$PropTypes = _react2.default.PropTypes,
	    string = _React$PropTypes.string,
	    number = _React$PropTypes.number;


	var START_RATIO = 1.3,
	    END_RATIO = 1,
	    ANIMATION_TIME = 24;

	function getZeroIfNaN(number) {
	  if (isNaN(number)) {
	    return 0;
	  }

	  return number;
	}

	var PerspectiveImg = function (_React$Component) {
	  _inherits(PerspectiveImg, _React$Component);

	  function PerspectiveImg(props) {
	    _classCallCheck(this, PerspectiveImg);

	    var _this = _possibleConstructorReturn(this, (PerspectiveImg.__proto__ || Object.getPrototypeOf(PerspectiveImg)).call(this, props));

	    var width = props.width,
	        height = props.height,
	        containerWidth = props.containerWidth,
	        containerHeight = props.containerHeight;


	    _this.ratio = START_RATIO;

	    var imgStyle = Object.assign({}, style, _this.getImgStyle(true, props));

	    _this.state = {
	      start: false,
	      show: false,
	      imgStyle: imgStyle
	    };

	    _this.getImgStyle = _this.getImgStyle.bind(_this);
	    return _this;
	  }

	  _createClass(PerspectiveImg, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({
	        start: true
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      this.state = {
	        imgStyle: Object.assign({}, style, this.getImgStyle(this.state.show, props))
	      };
	    }
	  }, {
	    key: 'getImgStyle',
	    value: function getImgStyle(show, props) {
	      props = props || this.props;

	      var _props = props,
	          width = _props.width,
	          height = _props.height,
	          containerWidth = _props.containerWidth,
	          containerHeight = _props.containerHeight;
	      var ratio = this.ratio;


	      var newWidth = containerWidth * ratio;
	      var newHeight = newWidth * height / width;

	      return {
	        top: getZeroIfNaN((containerHeight - newHeight) / 2),
	        left: getZeroIfNaN((containerWidth - newWidth) / 2),
	        width: getZeroIfNaN(newWidth),
	        height: getZeroIfNaN(newHeight)
	      };
	    }
	  }, {
	    key: 'startAnimation',
	    value: function startAnimation() {
	      this.ratio = END_RATIO;

	      this.setState({
	        show: true,
	        imgStyle: Object.assign({
	          transition: ANIMATION_TIME + 's'
	        }, style, this.getImgStyle(this.state.show))
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('img', { onLoad: this.startAnimation.bind(this),
	        style: this.state.imgStyle,
	        src: this.state.start ? this.props.src : null });
	    }
	  }]);

	  return PerspectiveImg;
	}(_react2.default.Component);

	PerspectiveImg.propTypes = {
	  src: string.isRequired,
	  width: number.isRequired,
	  height: number.isRequired,
	  containerWidth: number.isRequired,
	  containerHeight: number.isRequired
	};

	var style = {
	  position: 'absolute'
	};

	exports.default = PerspectiveImg;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(29);

	var _markedChartjsBinding = __webpack_require__(18);

	var _CONSTANTS = __webpack_require__(10);

	var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

	var _Disqus = __webpack_require__(39);

	var _Disqus2 = _interopRequireDefault(_Disqus);

	var _getPostUrl = __webpack_require__(41);

	var _getPostUrl2 = _interopRequireDefault(_getPostUrl);

	var _isBrowser = __webpack_require__(40);

	var _isBrowser2 = _interopRequireDefault(_isBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global CodeMirror */


	var forEach = [].forEach;

	var string = _react2.default.PropTypes.string;


	var CODEMIRROR_DEFAULT_CONFIG = {
	  htmlMode: true,
	  readOnly: true,
	  lineNumbers: true,
	  lineWrapping: true,
	  theme: 'monokai-sublime',
	  tabSize: 2
	};

	function getModeFromNode(codeDOMNode) {
	  var lang = codeDOMNode.getAttribute('class');
	  if (!lang) {
	    return '';
	  }

	  lang = lang.slice(lang.indexOf('lang-') + 5);
	  switch (lang.toLowerCase()) {
	    case 'js':
	    case 'javascript':
	      return 'javascript';
	    case 'html':
	    case 'xml':
	      return 'xml';
	    default:
	      return '';
	  }
	}

	function htmlDecode(input) {
	  var e = document.createElement('div');
	  e.innerHTML = input;
	  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
	}

	// TODO: avoid double highlight
	function highlightCode(codeBlockArr) {
	  if (!(0, _isBrowser2.default)() || codeBlockArr.length === 0) {
	    return;
	  }

	  forEach.call(codeBlockArr, function (codeDOM) {
	    var config = Object.assign({}, CODEMIRROR_DEFAULT_CONFIG, {
	      value: htmlDecode(codeDOM.innerHTML),
	      mode: getModeFromNode(codeDOM)
	    });

	    // eslint-disable-next-line
	    new CodeMirror(function (elt) {
	      codeDOM.parentNode.parentNode.replaceChild(elt, codeDOM.parentNode);
	    }, config);
	  });
	}

	// eslint-disable-next-line
	var MarkedContent = _react2.default.createClass({
	  componentDidMount: function componentDidMount() {
	    this.highlightCodes();
	    this.wrapImgs();
	    (0, _markedChartjsBinding.renderCharts)();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.highlightCodes();
	    (0, _markedChartjsBinding.renderCharts)();
	  },
	  highlightCodes: function highlightCodes() {
	    // eslint-disable-next-line
	    var codes = _reactDom2.default.findDOMNode(this).querySelectorAll('pre code');
	    highlightCode(codes);
	  },
	  wrapImgs: function wrapImgs() {
	    // eslint-disable-next-line
	    var imgs = _reactDom2.default.findDOMNode(this).querySelectorAll('img');

	    if (!(0, _isBrowser2.default)() || imgs.length === 0) {
	      return;
	    }

	    imgs.forEach(function (imgEle) {
	      var src = imgEle.getAttribute('src');
	      var parentNode = imgEle.parentNode;


	      var aEle = document.createElement('a');

	      aEle.setAttribute('href', src);
	      aEle.setAttribute('target', '_blank');

	      parentNode.replaceChild(aEle, imgEle);

	      aEle.appendChild(imgEle);
	    });
	  },
	  render: function render() {
	    // eslint-disable-next-line
	    return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.children.toString() } });
	  }
	});

	// eslint-disable-next-line

	var SimplePost = function (_React$Component) {
	  _inherits(SimplePost, _React$Component);

	  // eslint-disable-next-line
	  function SimplePost(props) {
	    _classCallCheck(this, SimplePost);

	    return _possibleConstructorReturn(this, (SimplePost.__proto__ || Object.getPrototypeOf(SimplePost)).call(this, props));
	  }

	  _createClass(SimplePost, [{
	    key: 'render',
	    value: function render() {
	      var id = '' + _CONSTANTS2.default.DISQUS.ARTICLE_ID_PREFIX + this.props.title;
	      var url = (0, _getPostUrl2.default)(this.props.fileName);

	      return _react2.default.createElement(
	        'div',
	        { className: 'blog-simple-post region' },
	        _react2.default.createElement(
	          MarkedContent,
	          null,
	          this.props.htmlContent
	        ),
	        _react2.default.createElement(_Disqus2.default, {
	          initialIdentifier: id,
	          initialTitle: this.props.title, initialUrl: url
	        })
	      );
	    }
	  }]);

	  return SimplePost;
	}(_react2.default.Component);

	SimplePost.propTypes = {
	  title: string,
	  fileName: string,
	  htmlContent: string
	};

	function select(state) {
	  var _state$post = state.post,
	      title = _state$post.title,
	      htmlContent = _state$post.htmlContent,
	      fileName = _state$post.fileName;


	  return {
	    title: title,
	    fileName: fileName,
	    htmlContent: htmlContent
	  };
	}

	var ConnectedSimplePost = (0, _reactRedux.connect)(select)(SimplePost);

	exports.default = ConnectedSimplePost;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _CONSTANTS = __webpack_require__(10);

	var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

	var _isBrowser = __webpack_require__(40);

	var _isBrowser2 = _interopRequireDefault(_isBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var string = _react2.default.PropTypes.string;


	var Disqus = _react2.default.createClass({
	  propTypes: {
	    initialIdentifier: string,
	    initialTitle: string,
	    initialUrl: string
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      initialIdentifier: _CONSTANTS2.default.DISQUS.DEFAULT_IDENTIFIER,
	      initialTitle: _CONSTANTS2.default.DISQUS.DEFAULT_TITLE,
	      initialUrl: !(0, _isBrowser2.default)() ? '' : location.href
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.requireInit();

	    // if(window.DISQUS){
	    //   this.configInit();
	    // }else{
	    //   this.requireInit();
	    // }
	  },
	  requireInit: function requireInit() {
	    if (!(0, _isBrowser2.default)()) {
	      return;
	    }

	    // jscs:disable
	    window.disqus_shortname = _CONSTANTS2.default.DISQUS.SHORT_NAME;
	    window.disqus_identifier = this.props.initialIdentifier;
	    window.disqus_title = this.props.initialTitle;
	    window.disqus_url = this.props.initialUrl;

	    (function () {
	      var dsq = document.createElement('script');
	      dsq.type = 'text/javascript';
	      dsq.async = true;
	      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    })();

	    // jscs:enable
	  },


	  // configInit(){
	  //   window.DISQUS.reset({
	  //     reload: true,
	  //     config: () => {
	  //       this.page.identifier = this.props.initialIdentifier;
	  //       this.page.title = this.props.initialTitle;
	  //       this.page.url = this.props.initialUrl;
	  //     }
	  //   });
	  // },
	  // disqusTempData: {},
	  // resetConfig(identifier, title, url){
	  //   if(window.DISQUS){
	  //     if(!identifier){
	  //       return;
	  //     }
	  //     if(!url){
	  //       url = location.href;
	  //     }
	  //     if(!title){
	  //       title = document.title;
	  //     }
	  //     window.DISQUS.reset({
	  //       reload: true,
	  //       config: function () {
	  //         this.page.identifier = identifier;
	  //         this.page.title = title;
	  //         this.page.url = url;
	  //       }
	  //     });
	  //   }else{
	  //     this.disqusTempData = {identifier, title, url};
	  //     this.startCheckingTimer();
	  //   }
	  // },
	  // disqusInited:false,
	  // startCheckingTimer(){
	  //   if(!this.disqusInited){
	  //     setTimeout(() => {
	  //       if(window.DISQUS){
	  //         this.disqusInited = true;
	  //         const {identifier, title, url} = this.disqusTempData;
	  //         window.DISQUS.reset({
	  //           reload: true,
	  //           config: () => {
	  //             this.page.identifier = identifier;
	  //             this.page.title = title;
	  //             this.page.url = url;
	  //           }
	  //         });
	  //       }else{
	  //         this.startCheckingTimer();
	  //       }
	  //     }, 1000);
	  //   }
	  // },
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'blog-disqus', id: 'disqus_thread' });
	  }
	});

	exports.default = Disqus;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isBrowser() {
	  return typeof window !== 'undefined';
	}

	exports.default = isBrowser;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getPostUrl;

	var _CONSTANTS = __webpack_require__(10);

	var _CONSTANTS2 = _interopRequireDefault(_CONSTANTS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ORIGIN = _CONSTANTS2.default.BLOG.ORIGIN;

	// TODO: it wold be pain when we change url

	function getPostUrl(fileName) {
	  return ORIGIN + '/post/' + fileName;
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(38);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _posts = __webpack_require__(11);

	var _posts2 = _interopRequireDefault(_posts);

	var _Disqus = __webpack_require__(39);

	var _Disqus2 = _interopRequireDefault(_Disqus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SimpleList = _react2.default.createClass({
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'blog-simple-list region' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'mdl-typography--display-1' },
	        '\u6587\u7AE0\u5217\u8868'
	      ),
	      _posts2.default.map(function (item, index) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'post-item mdl-typography--title', key: item.title + item.publicDate },
	          _react2.default.createElement(
	            'a',
	            { className: 'title no-deco', href: '/post/' + item.fileName },
	            item.title
	          ),
	          _react2.default.createElement(
	            'p',
	            { className: 'public-date' },
	            item.publicDate
	          ),
	          _react2.default.createElement(
	            'p',
	            { className: 'description' },
	            item.description
	          )
	        );
	      }),
	      _react2.default.createElement(_Disqus2.default, null)
	    );
	  }
	});

	exports.default = SimpleList;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(27);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LIST_STYLE = {
	  listStyle: 'inherit'
	};
	var IMG_STYLE = { marginTop: 20 };

	var JLPT_WIKI_URL = 'https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%83%BD%E5%8A%9B%E8%A9%A6%E9%A8%93';
	var ATOLS_YOUTUBE_URL = 'https://www.youtube.com/user/gridm7';
	var D3_GALLERY_SRC = 'https://camo.githubusercontent.com/3bd164ff8c1d4b3b934b624016211f8ae6487422/687474703a2f2f626c2e6f636b732e6f72672f6f7979642f7261772f38353966616663383132323937376133616664362f7468756d626e61696c2e706e67';
	var SSJS = 'https://github.com/oyyd/shadowsocks-js';

	function About() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'div',
	      { className: 'region' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'mdl-typography--display-1' },
	        'About oyyd.blog'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'features'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          'ES6 + async await + SourceMap'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          'Flexibility > Performance'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          'Server Side Rendering'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          'Avoid Heavy Usage of Preprocessing'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          'HMR(failed at react router)'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'region' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'mdl-typography--display-1' },
	        'About me'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Hi\uFF0C\u6211\u6BCF\u5929\u90FD\u4F1A\u5199\u4E0D\u5C11\u4EE3\u7801\uFF0C\u5E76\u601D\u8003\u5176\u4E2D\u7684\u4E8B\u60C5\u3002\u4F60\u53EF\u80FD\u6709\u5174\u8DA3\u4E86\u89E3\u5F97\u66F4\u591A\u4E00\u70B9\uFF1A'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { style: LIST_STYLE },
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u6211\u82B1\u4E86\u4E00\u5E74\u591A\u7684\u65F6\u95F4\u5B66\u4E60\u65E5\u8BED\uFF0C\u8003\u4E86',
	          _react2.default.createElement(
	            'a',
	            { href: JLPT_WIKI_URL, target: '_blank' },
	            'JLPT N1'
	          ),
	          '\u7684\u8BC1\u4E66\u3002'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u9AD8\u4E2D\u65F6\u53C2\u52A0\u4E86NOIP\uFF0C\u5F00\u59CB\u7F16\u7A0B\uFF0C\u83B7\u5F97\u4E86\u4E00\u7B49\u5956\uFF0C\u5E76\u4ECE\u4E2D\u4F53\u4F1A\u5230\u4E86\u522B\u6837\u7684\u4E50\u8DA3\u3002'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u53EF\u4EE5\u8BB2\u95FD\u5357\u8BED\u3002'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u542C\u5F88\u591Avocaloid\u76F8\u5173\u7684\u97F3\u4E50\u3002'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u4E0D\u5E38\u4F7F\u7528\u793E\u4EA4\u8F6F\u4EF6\u3002'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u5076\u5C14\u4E0Apixiv\u3002'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'region' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'mdl-typography--display-1' },
	        'Contact'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        '\u4E0D\u8981\u62C5\u5FC3\uFF0C\u7ED9\u6211\u53D1\u90AE\u4EF6\u5427\uFF1A',
	        _react2.default.createElement(
	          'a',
	          { href: 'mailto://oyydoibh@gmail.com' },
	          'oyydoibh@gmail.com'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'region' },
	      _react2.default.createElement(
	        'h2',
	        { className: 'mdl-typography--display-1' },
	        'Works'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { className: 'content' },
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u534F\u4F5C\u8005\xA0',
	          _react2.default.createElement(
	            'a',
	            { href: 'https://github.com/mozilla/nunjucks', target: '_blank' },
	            'mozilla/nunjucks'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u7FFB\u8BD1\xA0',
	          _react2.default.createElement(
	            'a',
	            {
	              href: 'https://www.gitbook.com/book/oyyd/typescript-handbook-zh/details',
	              target: '_blank'
	            },
	            'Typescript Handbook'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'div',
	            null,
	            'D3 Gallery -',
	            _react2.default.createElement(
	              'a',
	              { href: 'http://bl.ocks.org/oyyd/859fafc8122977a3afd6', target: '_blank' },
	              'Days-Hours Heatmap'
	            )
	          ),
	          _react2.default.createElement('img', { style: IMG_STYLE, src: D3_GALLERY_SRC, alt: 'Days-Hours Heatmap' })
	        )
	      )
	    )
	  );
	}

	About.title = 'oyyd-blog - 关于我';

	exports.default = About;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createStore;

	var _redux = __webpack_require__(46);

	var _reactRouterRedux = __webpack_require__(47);

	var _reactRouter = __webpack_require__(44);

	var _reducer = __webpack_require__(48);

	var _reducer2 = _interopRequireDefault(_reducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createReducer(post) {
	  return (0, _redux.combineReducers)({
	    routing: _reactRouterRedux.routeReducer,
	    post: post
	  });
	}

	// reducers
	function createStore(initialState, url, shouldPatch) {
	  var reducers = createReducer(_reducer2.default);

	  var history = typeof url !== 'string' ? _reactRouter.browserHistory : (0, _reactRouter.createMemoryHistory)(url);
	  var reduxRouterMiddleware = (0, _reactRouterRedux.syncHistory)(history);
	  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(reduxRouterMiddleware)(_redux.createStore);

	  var store = createStoreWithMiddleware(reducers, initialState);

	  if (false) {
	    module.hot.accept('./post/reducer', function () {
	      // eslint-disable-next-line
	      var postReducer = require('./post/reducer');
	      var nextRootReducer = createReducer(postReducer);

	      store.replaceReducer(nextRootReducer);
	    });
	  }

	  return store;
	}

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = require("redux");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = require("react-router-redux");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initialPost = {
	  title: null,
	  fileName: null,
	  htmlContent: null
	};

	function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialPost;
	  var action = arguments[1];

	  switch (action.type) {
	    case 'POST_INIT':
	      return {
	        title: action.title,
	        fileName: action.fileName,
	        htmlContent: action.htmlContent
	      };
	    default:
	      return state;
	  };
	}

	exports.default = reducer;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initPost = initPost;
	function initPost(title, fileName, htmlContent) {
	  return {
	    type: 'POST_INIT',
	    title: title,
	    fileName: fileName,
	    htmlContent: htmlContent
	  };
	}

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function escapeJSONString(string) {
	  return string.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\\"').replace(/[\/]/g, '\\/').replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t');
	}

	exports.default = escapeJSONString;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createHead = __webpack_require__(52);

	var _createHead2 = _interopRequireDefault(_createHead);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createPage(ctx) {
	  var content = ctx.content;
	  var title = ctx.title,
	      description = ctx.description,
	      initialState = ctx.initialState;


	  title = title || 'oyyd blog';
	  description = description || '这是亚东的博客，你可以在上面看到我的一些想法和实践，欢迎来访。';
	  initialState = initialState || 'null';

	  return '<!DOCTYPE html>\n    <html>\n      ' + (0, _createHead2.default)({ title: title, description: description }) + '\n      <body>\n        <div id="main">' + content + '</div>\n        <script>\n          window.__INITIAL_STATE__ = JSON.parse("' + initialState + '");\n        </script>\n        <script src="/static_lib/codemirror/codemirror.js"></script>\n        <script src="/static_lib/codemirror/mode/javascript/javascript.js"></script>\n        <script src="/static_lib/codemirror/mode/xml/xml.js"></script>\n        <script src="/dist/browser_bundle.js"></script>\n        <script>\n          (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n          })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n\n          ga(\'create\', \'UA-70462946-1\', \'auto\');\n          ga(\'send\', \'pageview\');\n        </script>\n      </body>\n    </html>';
	}

	exports.default = createPage;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function createHead(ctx) {
	  var title = ctx.title,
	      description = ctx.description;


	  return "<head>\n      <title>" + title + "</title>\n      <meta name=\"description\" content=\"" + description + "\"/>\n      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link rel=\"shortcut icon\" href=\"/static/favicon.ico\" />\n      <link rel=\"stylesheet\" href=\"/static_lib/codemirror/codemirror.css\"/>\n      <link rel=\"stylesheet\" href=\"/static_lib/codemirror/theme/monokai-sublime.css\"/>\n      <link rel=\"stylesheet\" href=\"/dist/style.css\"/>\n      <script type='text/javascript'>\n        var _vds = _vds || [];\n        window._vds = _vds;\n        (function(){\n          _vds.push(['setAccountId', '8c5fbd1440d378e5']);\n          (function() {\n            var vds = document.createElement('script');\n            vds.type='text/javascript';\n            vds.async = true;\n            vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';\n            var s = document.getElementsByTagName('script')[0];\n            s.parentNode.insertBefore(vds, s);\n          })();\n        })();\n      </script>\n    </head>";
	}

	exports.default = createHead;

/***/ })
/******/ ]);