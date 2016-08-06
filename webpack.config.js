const debug = process.env.NODE_ENV !== "production";

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/index.html',
  inject: false
});

module.exports = {
  cache: true,
  devtool: "sourcemap",
  entry: './src/index.js',
  output: { path: 'public', filename: 'assets/[hash].js' },
  module: {
    loaders: [
      // this thing is just for code that exports the library to the `window`
      {
        test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel',
        query: { presets: ['es2015'] }
      },
      // this thing transpiles the library
      {
        test: /discordie.lib..*\.jsx?$/, loader: 'babel',
        query: {
          plugins: [
            // this thing fixes some runtime error
            "transform-runtime",
            // this thing fixes babel not supporting extending arrays
            ["babel-plugin-transform-builtin-extend", {
              globals: ["Error", "Array"]
            }]
          ],
          presets: ['es2015']
        }
      },
      // this thing is for package.json that is not really required
      { test: /\.json$/, loader: 'json' },
    ]
  },
  node: {
    "fs":              "empty",
    "child_process":   "empty",
    "dns":             "empty",
    "dgram":           "empty",
    "tls":             "empty"
  },
  resolve: {
    alias: {
      "node-opus":     "empty-module",
      "requireindex":  "empty-module",
      "ws":            "empty-module"
    }
  },
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    html
  ] : [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.NoErrorsPlugin(),
    html
  ]
};