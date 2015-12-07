// server
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _getPostContent = require('../getPostContent');

var _getPostContent2 = _interopRequireDefault(_getPostContent);

var _generateRoutes = require('../../client/generateRoutes');

var _generateRoutes2 = _interopRequireDefault(_generateRoutes);

var _createStore = require('../../client/state/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _posts = require('../../client/posts.data');

var _posts2 = _interopRequireDefault(_posts);

var _actions = require('../../client/state/post/actions');

var _reactRouter = require('react-router');

var _escapeJSONString = require('../utils/escapeJSONString');

var _escapeJSONString2 = _interopRequireDefault(_escapeJSONString);

var _page = require('../../template/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// TODO: a better 404 response
var NOT_FOUND_CONTENT = 'not found';
var prefix = process.cwd();

function transformPostsData(data) {
  var hash = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

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
      var title = postData.title;
      var fileName = postData.fileName;

      try {
        store.dispatch((0, _actions.initPost)(title, fileName, htmlContent));
      } catch (e) {
        reject(e);
      }

      resolve();
    });
  });
}

function pageRender(req, res) {
  var store = (0, _createStore2.default)();

  var routes = (0, _generateRoutes2.default)(null);
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var _ret = (function () {
        var fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
        var postData = postsDataHash[fileName];

        if (!postData) {
          res.status(404).send(NOT_FOUND_CONTENT);
          return {
            v: undefined
          };
        }

        updatePostStore(store, postData).then(function () {
          res.status(200).send((0, _page2.default)({
            title: postData.title,
            content: (0, _server.renderToString)(_react2.default.createElement(
              _reactRedux.Provider,
              { store: store },
              _react2.default.createElement(_reactRouter.RoutingContext, renderProps)
            )),
            description: postData.description,
            initialState: (0, _escapeJSONString2.default)(JSON.stringify(store.getState()))
          }));
        }, function (err) {

          res.status(500).send(err.message);
        });
      })();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      res.status(404).send(NOT_FOUND_CONTENT);
    }
  });
}

exports.default = pageRender;