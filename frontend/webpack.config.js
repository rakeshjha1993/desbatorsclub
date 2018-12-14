const ExtractPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    devtool : 'eval',
    mode: 'development',
    entry : `${__dirname}/src/main.js`,
    output : {
        filename : 'bundle-[hash].js',
        path : `${__dirname}/build`,
        publicPath : '/'
    },
    plugins : [
        new HTMLPlugin(),
        new ExtractPlugin('bundle-[hash].css')
    ],
    devServer: {
        inline: false,
        contentBase: "./dist",
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_module/,
                loader : 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader : ExtractPlugin.extract(['css-loader','sass-loader'])
            }
        ]
    }
}