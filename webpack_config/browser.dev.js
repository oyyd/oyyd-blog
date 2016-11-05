/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  debug: true,
  watch: true,
  entry: {
    browser_bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './src/client/bootstrap.js'
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: [
        'babel?' + JSON.stringify({
          "presets": ["es2015"],
          "plugins": ["transform-react-jsx", "transform-async-to-generator"]
        }),
      ],
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    },
  ]},
  plugins: [
    new ExtractTextPlugin('./style.css', {
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //   },
    // }),
  ],
};
