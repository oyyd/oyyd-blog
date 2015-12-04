const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './lib/client/bootstrap.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: [
        path.join(__dirname, 'lib/client'),
      ],
      exclude: [
        path.join(__dirname, 'node_modules'),
      ],
    }, {
      test: /\.less$/,
      include: [
        path.join(__dirname, 'src/client'),
      ],
      exclude: [
        path.join(__dirname, 'node_modules'),
      ],
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
    },
  ],
  },
  plugins: [
    new ExtractTextPlugin('./style.css', {
      allChunks: true,
    }),
  ],
};
