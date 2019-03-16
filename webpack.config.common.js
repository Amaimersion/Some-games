const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
const HardSourcePlugin = require('hard-source-webpack-plugin');


module.exports = function(env) {
    env = env || {};

    const srcFolder = path.resolve(__dirname, 'src');
    const outputFolder = path.resolve(__dirname, 'dist');
    const entryPointFolder = path.resolve(__dirname, srcFolder, 'build');

    return {
        entry: `${srcFolder}/frontend/index.tsx`,
        output: {
            path: outputFolder
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.s(c|a)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
                }
            ]
        },
        plugins: [
            new HardSourcePlugin({
                cacheDirectory: path.resolve(__dirname, '.cache')
            }),
            /*
            new CopyWebpackPlugin([
            ]),
            */
            new RemovePlugin({
                before: {
                    root: __dirname,
                    include: [outputFolder]
                }
            }),
            new HTMLWebpackPlugin({
                template: `${srcFolder}/frontend/index.pug`,
                filename: 'index.html',
                inject: false
            }),
        ],
        resolve: {
            alias: {
            },
            plugins: [
                /*
                 * "If you want to use new paths and baseUrl feature of TS 2.0 please include TsConfigPathsPlugin".
                 * https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
                 */
                new TsConfigPathsPlugin()
            ],
            extensions: [
                '.ts', '.tsx', '.d.ts',
                '.js', '.jsx',
                '.json',
                '.css', '.scss',
                '.html', '.pug'
            ]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    }
}
