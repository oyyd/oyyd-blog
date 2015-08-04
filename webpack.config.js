var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3030', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/client/bootstrap.js'
  ],
  output: {
    path: path.join(__dirname, 'dist/client/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{ 
      test: /\.js?$/,
      loaders: ['react-hot', 'babel-loader'] ,
      include: path.join(__dirname, 'src/client')
    },{
      test: /\.less$/,
      include: [
        path.join(__dirname, 'src/client')
      ],      
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};