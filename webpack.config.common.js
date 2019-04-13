const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');
const HardSourcePlugin = require('hard-source-webpack-plugin');


module.exports = function(env) {
    env = env || {};

    const isProduction = (env.NODE_ENV === 'production');
    const folder = {
        src: path.resolve(__dirname, 'src'),
        output: path.resolve(__dirname, 'dist'),
        entryFrontend: path.resolve(__dirname, 'src', 'build', 'frontend'),
        frontend: path.resolve(__dirname, 'src', 'frontend'),
        hardSourceCache: path.resolve(__dirname, '.cache')
    };
    const HTMLPluginCommonOptions = {
        inject: false,
        production: isProduction
    };

    return {
        entry: {
            'index': `${folder.entryFrontend}/index.js`,
            'tic-tac-toe': `${folder.entryFrontend}/tic-tac-toe.js`
        },
        output: {
            path: folder.output
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
                cacheDirectory: folder.hardSourceCache
            }),
            new RemovePlugin({
                before: {
                    include: [
                        folder.output
                    ]
                }
            }),
            new HTMLWebpackPlugin({
                ...HTMLPluginCommonOptions,
                template: `${folder.frontend}/html/index/index.pug`,
                filename: 'index.html'
            }),
            new HTMLWebpackPlugin({
                ...HTMLPluginCommonOptions,
                template: `${folder.frontend}/html/tic-tac-toe/tic-tac-toe.pug`,
                filename: 'tic-tac-toe.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        resolve: {
            alias: {
                '@frontendHTML': `${folder.frontend}/html`,
                '@frontendCSS': `${folder.frontend}/css`,
                '@frontendJS': `${folder.frontend}/js`
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
