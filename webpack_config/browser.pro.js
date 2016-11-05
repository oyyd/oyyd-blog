const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserConfig = require('./browser.dev');

module.exports = Object.assign({}, browserConfig, {
  debug: false,
  watch: false,
  devtool: null,
  entry: {
    browser_bundle: [
      'babel-polyfill',
      './src/client/bootstrap.js',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new ExtractTextPlugin('./style.css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
