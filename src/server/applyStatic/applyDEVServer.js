export default function apply(app) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const browserDEVConfig = require('../../../webpack_config/browser.dev');
  const webpack = require('webpack');


  const compiler = webpack(browserDEVConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: browserDEVConfig.output.publicPath,
    log: () => {},
  }));

  app.use(webpackHotMiddleware(compiler));
}
