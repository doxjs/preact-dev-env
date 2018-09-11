const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const path = require('path');
const extract = require('extract-text-webpack-plugin');
const extractLess = new extract({
    filename: 'static/css/[name].[chunkhash:8].css'
});

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
                use: extractLess.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]--[hash:9]'
                            }
                        }, 'less-loader']
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
    mode: 'production',
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vender: {
                    name: 'vendor',
                    minSize: 1024,
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        },
        minimize: true
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
        publicPath: '/'
    },
    plugins: [
        new html({
            template: './src/index.html'
        }),
        new clean([path.resolve('./dist')], {
            root: path.resolve('./')
        }),
        extractLess
    ]
}
