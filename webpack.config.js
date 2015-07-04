var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/client/bootstrap.js'
  ],
  output: {
      path: path.join(__dirname, 'dist/client'),
      filename: 'bundle.js'
  },
  module: {
    loaders: [{ 
      test: path.join(__dirname, 'src'),
      loaders: ['react-hot', 'babel-loader'] 
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};