var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var getWebpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var uglifyOptions = {
    mangle: true,
    compress: {
        sequences: true,
        'dead_code': true,
        'drop_debugger': true,
        conditionals: true,
        booleans: true,
        unused: true,
        'if_return': true,
        'join_vars': true,
        warnings: false
    }
};

var buildConfig = _.assign(getWebpackConfig(), {
    output: {
        path: path.join(__dirname, '/build/'),
        publicPath: '/',
        filename: '[name].[hash].js'
    }
});

buildConfig.module.loaders.filter(function(definition) {
    return definition.loader.indexOf('!css') !== -1;
}).forEach(function(loaderDefinition) {
    var loader = loaderDefinition.loader.replace('style!', '');

    loaderDefinition.loader = ExtractTextPlugin.extract('style', loader);
});

buildConfig.plugins = buildConfig.plugins.concat(
    new ExtractTextPlugin('[name].[hash].css'),

    new webpack.DefinePlugin({
        'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
        }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions),
    new HtmlWebpackPlugin({
        template: 'index.build.html'
    }),

    function() {
        this.plugin('done', function(stats) {
            var filename = path.join(__dirname, 'build', 'stats.json');
            stats = JSON.stringify(stats.toJson(), null, '\t');

            require('fs').writeFileSync(filename, stats);
        });
    }
);

module.exports = buildConfig;
