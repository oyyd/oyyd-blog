const webpack = require('webpack');
const config = require('./server.dev');

const debug = true;

const basicPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
  new webpack.IgnorePlugin(/\.(css|less)$/),
];

module.exports = Object.assign({}, config, {
  debug: false,
  plugins: basicPlugins,
}, debug ? {
  debug: true,
  devtool: null,
  plugins: basicPlugins.concat([
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
  ]),
} : null);
