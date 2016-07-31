var path = require('path');
var webpack = require('webpack');

var config = {
	context: path.join(__dirname, 'scripts'), // исходная директория
	entry: './main.js', // файл для сборки, если несколько - указываем hash (entry name => filename)
	output: {
		path: path.join(__dirname, 'assets'),
		filename: 'bundle.js', // выходная директория
		library: "main"

	},
	watch:true
};

module.exports = config;