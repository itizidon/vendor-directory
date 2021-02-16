const { merge } = require('webpack-merge');

const webpackCommon = require('./webpack-common.config.js');

module.exports = merge(webpackCommon, {
  mode: 'production',
  devtool: 'none',
});
