const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './assets/src/index.js',
    output: {
        filename: isProduction ? 'search.min.js' : 'search.js',
        path: path.resolve(__dirname, 'assets/dist'),
        library: 'SearchApp',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    optimization: {
        minimize: isProduction,
        usedExports: true, // Improved Tree Shaking
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: isProduction,
                    },
                    mangle: true, // Minification value
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        }),
    ],
}
