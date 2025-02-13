const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './assets/src/index.js',
    output: {
        filename: isProduction ? 'search.min.js' : 'search.js',
        path: path.resolve(__dirname, 'assets/dist'),
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    optimization: {
        minimize: isProduction,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development') // 🛠 Исправляем конфликт
        })
    ]
};
