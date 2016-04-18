var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getWebpackConfig = require('./webpack.config.js');

var devConfig = _.assign(getWebpackConfig(), {
    devtool: 'cheap-inline-source-map',

    output: {
        path: path.join(__dirname, '/'),

        // Specify complete path to force
        // chrome/FF load the images
        publicPath: 'http://localhost:3000/',
        filename: '[name].js'
    }
});

_.keysIn(devConfig.entry).forEach(function(key) {
    var currentValue = devConfig.entry[key];

    devConfig.entry[key] = currentValue.concat(
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    );
});

devConfig.module.loaders.forEach(function(loaderDef) {
    if (loaderDef.test.toString().indexOf('.js') > 0) {
        loaderDef.loader = 'react-hot!' + loaderDef.loader;
    }
});

devConfig.plugins = devConfig.plugins.concat(
    new webpack.DefinePlugin({
        DEBUG: true
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.webpack.html'
    })
);

module.exports = devConfig;
