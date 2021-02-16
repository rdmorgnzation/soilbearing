var path = require('path');

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
    path: path.resolve(__dirname, '../django/frontend/static'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = [config]
