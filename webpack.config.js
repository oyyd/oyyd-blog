const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'bundle': './src/client/bootstrap.js',
    'about-bundle': ['./src/client/pages/About/index.js']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'] ,
      include: [
        path.join(__dirname, 'src/client')
      ],
      exclude: [
        path.join(__dirname, 'node_modules')
      ]
    },{
      test: /\.less$/,
      include: [
        path.join(__dirname, 'src/client')
      ],
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  plugins: [
    new ExtractTextPlugin('./style.css', {
      allChunks: true
    })
  ]
};
