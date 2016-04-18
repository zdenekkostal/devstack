var path = require('path');
var webpack = require('webpack');

module.exports = function getWebpackConfig() {
    var babelOptions = JSON.stringify({
        presets: ['stage-0', 'es2015', 'react'],
        plugins: ['transform-runtime', 'transform-proto-to-assign']
    });

    return {
        entry: {
            app: ['./app/app']
        },

        output: {},

        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel?' + babelOptions,
                    exclude: /node_modules/,
                },

                {
                    test: /\.styl$/,
                    loader: 'style!css?sourceMap!autoprefixer!stylus'
                },

                {
                    test: /\.scss$/,
                    loader: 'style!css?sourceMap!autoprefixer!sass'
                },

                {
                    test: /\.css$/,
                    loader: 'style!css?sourceMap!autoprefixer'
                },

                // https://msdn.microsoft.com/en-us/library/cc848897(v=vs.85).aspx
                {
                    test: /\.png$/,
                    loader: 'url?limit=32768&mimetype=image/png'
                },

                {
                    test: /\.(jpe?g|eot|woff|ttf|svg)/,
                    loader: 'file'
                }
            ]
        },

        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx', '.styl', '.scss'],
            modulesDirectories: ['node_modules'],

            alias: {
            }
        },

        plugins: []
    };
};
