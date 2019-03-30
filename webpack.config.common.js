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
        entry: {
            'index': `${srcFolder}/build/index.js`
        },
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
                    test: /\.s(c|a)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        'browsers': ['> 1%', 'last 2 versions']
                                    })
                                ]
                            }
                        },
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
                template: `${srcFolder}/frontend/html/index.pug`,
                filename: 'index.html',
                inject: false,
                production: (env.NODE_ENV === 'production')
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        resolve: {
            alias: {
                '@interfaceHTML': `${srcFolder}/frontend/html`,
                '@interfaceCSS': `${srcFolder}/frontend/css`,
                '@interfaceJS': `${srcFolder}/frontend/js`
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
