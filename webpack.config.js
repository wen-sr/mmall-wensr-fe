/*
* @Author: wen-sr
* @Date:   2017-08-29 10:52:48
* @Last Modified by:   wen-sr
* @Last Modified time: 2017-08-29 16:22:46
*/
// var webpack 			= require("webpack");
var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
var CommonsChunkPlugin 	= require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin	= require("html-webpack-plugin");

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
	return {
			template : './src/view/'+ name +'.html',
			filename : 'view/'+ name +'.html',
			inject 	 : true,
			hash 	 : true,
			chunks	 : ['common',name]
		}
}

var config = {
	entry:{
		"common" : './src/page/common/index.js',
		"index" : './src/page/index/index.js',
		"login" : './src/page/login/index.js'
	},
	output:{
		path:__dirname + '/dist/',
		publicPath:'/dist/',
		// filename:'[name].[chunkhash].js'
		filename:'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module : {
		loaders :[
			{ test : /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
		]
	},
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
	plugins: [
		new CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		new ExtractTextPlugin('css/[name].css'),
		new HtmlWebpackPlugin(getHtmlConfig("index")),
		new HtmlWebpackPlugin(getHtmlConfig("login")),
	]
}

module.exports = config;