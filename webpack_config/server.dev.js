/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const nodeModules = fs.readdirSync('node_modules');

// do not bundle `node_modules`
function checkExternals(ctx, req, next) {
  const startPath = req.split('/')[0];

  if (nodeModules.indexOf(startPath) > 0) {
    next(null, 'commonjs ' + req);
    return;
  }

  next();
}

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'source-map',
  debug: true,
  entry: {
    server_bundle: ['babel-polyfill', './src/server/app.js'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  externals: [checkExternals],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      query: {
        "presets": ["es2015"],
        "plugins": ["transform-react-jsx", "transform-async-to-generator"]
      },
    }],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
  ],
};
