var path = require("path");
var webpack = require("webpack");
module.exports = {
	cache: true,
	entry: './main.js',
  context: path.join(__dirname, 'src'),
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "dist/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			// required to write "require('./style.css')"
			{ test: /\.css$/, loader: "style-loader!css-loader" },

			// required for bootstrap icons
			{ test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/, loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/, loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/, loader: "file-loader?prefix=font/" },

      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}

		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	]
};
