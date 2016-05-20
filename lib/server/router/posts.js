'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = postRender;

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

var _createPage = require('../../template/createPage');

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
  }, next);
}

function postRender(callback, req, res) {
  var store = (0, _createStore2.default)({}, req.url);
  var routes = (0, _generateRoutes2.default)(null);
  var fileName = req.url.slice(req.url.lastIndexOf('/') + 1);
  var postData = postsDataHash[fileName];

  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    var operator = null;

    if (error) {
      operator = internalErr.bind(null, res, error.message);
    } else if (redirectLocation) {
      operator = redirectReq.bind(null, res, '' + redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps || !postData) {
      operator = notFound.bind(null, res);
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