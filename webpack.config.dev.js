const webpack = require('webpack');
const merge = require('webpack-merge');


module.exports = function(env) {
    env = env || {};
    env.NODE_ENV = 'development';

    const commonConfig = require('./webpack.config.common')(env);

    return merge(commonConfig, {
        mode: 'development',
        /**
         * All values are valid, except next ones: eval, cheap-eval-source-map, cheap-module-eval-source-map, eval-source-map.
         * Because they not suitable for Content Security Policy directive.
         * In short, the source map should not be a string that the browser evaluates as JavaScript.
         */
        devtool: 'inline-cheap-source-map',
        output: {
            filename: '[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            })
        ]
    });
}
