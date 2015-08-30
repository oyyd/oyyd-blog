var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/client/bootstrap.js'
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js'
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
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};
