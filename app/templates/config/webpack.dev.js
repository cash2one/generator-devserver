/**
 * 开发状态下的webpack配置文件
 */

// 项目配置文件信息
const DOMAIN = 'http://<%=domain%>';
const DEVSERVERDOMAIN = '<%=interfaceServer%>';

var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
};

module.exports = {

    entry: {
        index: path.resolve("./tools/will_not_be_used.js")
    },

    output: {
        path: path.resolve("./"),
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: DOMAIN + "/"
    },

    plugins: [
        new webpack.DefinePlugin(GLOBALS)
    ],

    module: {
        loaders: [
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader?presets[]=es2015&presets[]=react"
            },

            // 字体
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
            },

            // 图片
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['file']
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },

            // css
            {
                test: /\.css$/,
                // loaders: ['style', 'css?sourceMap']
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
            }
        ]
    },

    resolve: {
        // 模块的解析目录
        modulesDirectories: ['project_modules', 'br_modules', 'node_modules']
    },

    devServer: {
        host: "localhost",
        port: '<%=port%>',

        contentBase: "<%=root%>",

        hot: true,

        proxy: {
            "*.do": {
                target: DEVSERVERDOMAIN
            }
        }
    }
    
};