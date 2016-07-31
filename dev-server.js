var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
console.log(config)
var devServer = new WebpackDevServer(
	webpack(config),
	{
		contentBase: __dirname,
		publicPath: '.\assets',
		hot:true,
		inline:true
	}
).listen(3005, 'localhost');