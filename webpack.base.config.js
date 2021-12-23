const path = require("path")
const merge = require("webpack-merge")

const plugins = require('./webpack.plugin.config')
const loaders = require('./webpack.loader.config')

const config = merge(loaders, plugins, {
  mode: "development",
  entry: './client/src/App.jsx',
  output: {
    filename: "webpack-output.js",
    path: path.resolve(__dirname, "client/dist"),
  }
});

module.exports = config

