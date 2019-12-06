const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {

	mode: 'production',

	performance: {
		maxAssetSize: 1000000,
		maxEntrypointSize: 1000000,
		hints: "warning"
	},

	entry: {
		main: [
			'./assets/js/theme.js',
			'./assets/scss/theme.scss'
		]
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/scripts.min.js'
	},

	module: {
		rules: [
			{

				test: /\.js$/,
				use: ['babel-loader'],
			},

			{
				test: /\.scss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: false
						}
					},
					{loader: 'postcss-loader'},
					{
						loader: "group-css-media-queries-loader",
						options: {sourceMap: true}
					},
					{loader: 'sass-loader'}
				],
			},
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/theme.min.css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', {discardComments: {removeAll: true}}],
			},
			canPrint: true
		}),
		new CopyWebpackPlugin([
			{
				from: 'assets/img',
				to: 'img/[path]/[name].[ext]'
			}
		]),
	]

}