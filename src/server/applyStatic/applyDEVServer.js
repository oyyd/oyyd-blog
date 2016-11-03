import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import browserDEVConfig from '../../../webpack_config/browser.dev';
import webpack from 'webpack';

export default function apply(app) {
  if (false) {
    return;
  }

  const compiler = webpack(browserDEVConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: browserDEVConfig.output.publicPath,
    log: () => {},
  }));

  app.use(webpackHotMiddleware(compiler));
}
