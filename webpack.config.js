var path = require('path');
var webpack = require('webpack');

module.exports = function getWebpackConfig() {
    var babelOptions = JSON.stringify({
        presets: ['stage-0', 'es2015', 'react'],
        plugins: ['transform-runtime', 'transform-proto-to-assign', 'react-hot-loader/babel']
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
                    test: /\.css$/,
                    loader: 'style!css?sourceMap!postcss'
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

        postcss: function () {
            return [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-cssnext')(),
                require('postcss-local-scope')(),
                require('postcss-browser-reporter')(),
                require('postcss-reporter')(),
            ]
        },

        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx', '.css'],
            modulesDirectories: ['node_modules'],

            alias: {
            }
        },

        plugins: []
    };
};
