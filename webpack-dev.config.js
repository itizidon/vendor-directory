const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common.config.js');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
