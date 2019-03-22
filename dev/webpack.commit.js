const config = require('./private.json');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: ['babel-polyfill', './src/index.js'],
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	},
	output: {
		filename: config.filename,
		path: config.path,
		library: config.library,
		libraryTarget: 'umd'
	}
};