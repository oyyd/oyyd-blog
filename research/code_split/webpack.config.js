module.exports = {
  entry: {
    'page1': './src/page1.js',
    'page2': './src/page2.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }]
  },
};
