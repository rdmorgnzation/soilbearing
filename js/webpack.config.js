var path = require('path');
const webpack = require("webpack");

const js = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: [
	  {
	    loader: 'babel-loader',
	  },
	],
}

const config = {
  mode:'development',
  target: 'web',
  entry: {
      'index.jsx': path.resolve(__dirname, './src/index.jsx')
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, '../django_project/soilbearing/static'),
    filename: '[name].bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
        materialUI: { test: /[\\/]node_modules[\\/]((@material-ui).*)[\\/]/, name: "material", chunks: "all" },        
      }
    },
  }
};

module.exports = [config]
