/**
 * module dependencies for webpack dev configuration
 */
const path = require('path');
const webpack = require('webpack');

// define paths
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../public', 'build');
const mainAppPath = path.resolve(__dirname, '../client', 'App', 'index.js');
const sharedStylesPath = path.resolve(__dirname, '../client', 'SharedStyles');
const componentsPath = path.resolve(__dirname, '../client', 'Components');
const containersPath = path.resolve(__dirname, '../client', 'Containers');
const viewsPath = path.resolve(__dirname, '../client', 'Views');

/**
 * webpack development configuration
 */
module.exports = {
  target  : 'web',
  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    mainAppPath,
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [nodeModulesPath],
        loaders: [ 'react-hot', 'babel-loader' ], 
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader?sourceMap=inline',
        ],
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  postcss: [ require('autoprefixer'), require('postcss-nesting') ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve : {
    extensions: ['', '.js', '.css'],
    alias: {
      SharedStyles: sharedStylesPath,
      Components: componentsPath,
      Containers: containersPath,
      Views: viewsPath,
    },
  },
};
