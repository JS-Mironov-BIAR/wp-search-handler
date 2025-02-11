const path = require('path');

module.exports = {
    entry: './assets/src/index.js',
    output: {
        filename: 'search.js',
        path: path.resolve(__dirname, 'assets/dist'),
    },
    mode: 'production',
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
    }
};
