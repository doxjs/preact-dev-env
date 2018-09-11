const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const path = require('path');
const extract = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.resolve('./src/index.tsx'),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.less$/,
                use: extract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]--[hash:9]'
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'static/fonts/[hash].[ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: 'static/img/[hash].[ext]',
                    limit: 4096
                }
            }
        ]
    },
    mode: 'development',
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
        alias: {
            "@common": path.resolve('./src/common'),
            "@": path.resolve('./src'),
            "@components": path.resolve('./src/components'),
            "@assets": path.resolve('./src/assets'),
            "@pages": path.resolve('./src/pages')
        }
    },
    plugins: [
        new html({
            template: './src/index.html'
        }),
        new clean([path.resolve('./dist')], {
            root: path.resolve('./')
        }),
        new extract({
            filename: 'static/css/[name].[hash].css',
            allChunks: true
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve("./dist")
    },
    output: {
        publicPath: '/'
    }
}