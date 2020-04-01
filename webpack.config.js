const TerserPlugin = require('terser-webpack-plugin');
const {version} = require('./package');
const webpack = require('webpack');

module.exports = {
    mode: 'production',

    entry: {
        'nason': './src/index.ts'
    },

    output: {
        path: `${__dirname}/lib`,
        filename: '[name].min.js',
        library: 'Nason',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'babel-loader',
                    'ts-loader',
                    'eslint-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: `[name].min.js.map`
        }),
        new webpack.BannerPlugin({
            banner: `Nason ${version} MIT | https://github.com/Simonwep/nason`
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                sourceMap: true,
                terserOptions: {
                    mangle: {
                        properties: {
                            regex: /^_/
                        }
                    }
                }
            })
        ]
    }
};
