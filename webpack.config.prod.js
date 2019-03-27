const webpack = require('webpack');
const merge = require('webpack-merge');


module.exports = function(env) {
    env = env || {};
    env.NODE_ENV = 'production';

    const commonConfig = require('./webpack.config.common')(env);

    return merge(commonConfig, {
        mode: 'production',
        devtool: 'nosources-source-map',
        output: {
            filename: '[name].js',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
}
