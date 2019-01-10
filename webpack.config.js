const path =require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack =require('webpack');
const dev = process.env.NODE_ENV;
console.log(`--- ${dev} 모드로 실행합니다. ---`);
const isDevmode = dev === 'development';
console.log(isDevmode);
module.exports  = {
    entry:{
        'app':['@babel/polyfill','./src/index.js'],
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename: isDevmode ? "[name].bundle.js" :'[name].bundle.[hash].js',
        // chunkFilename: "[id].[chunkhash].js",
        publicPath: "/dist/"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts",".tsx",".js",".json"]
    },
    devServer: {
        historyApiFallback: true,
        host:process.env.HOST,
        port:process.env.PORT,
        open:true,
        hot:true,
        inline:true,
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            },
            // {
            //     test: /\.ts|\.tsx$/,
            //     loader:"awesome-typescript-loader",
            //     exclude: /node_modules/
            // },
            {
                enforce: "pre",
                test:/\.js$/,
                loader:"source-map-loader"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: isDevmode ? 'false' : 'true',
                                localIdentName: isDevmode ? '[local]' : '_[hash:base64:11]',
                                namedexport:true,
                                sourceMap: true,
                                minimize: true,
                            }
                        },
                        {
                            loader:'postcss-loader'
                        },
                        {
                            loader: 'fast-sass-loader'
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:base64:8].[ext]',
                    publicPath: '/dist/images/',
                    outputPath: 'images/',
                    limit: isDevmode ? 1000000 : 100000,
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: isDevmode ? '[name].bundle.css' : '[name].bundle.[hash].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
           'process.env':{
               'MODE':`"${process.env.NODE_ENV}"`
           }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};





// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
// const ManifestPlugin = require('webpack-manifest-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// //  set/export NODE_ENV=production
// //  set/export NODE_ENV=development
// console.log(process.env.NODE_ENV);
// const deployEnv = process.env.NODE_ENV === 'production';
// if (!deployEnv) {
//     console.log('-- 개발모드로 WEBPACK이 실행됩니다. --');
// } else if (deployEnv) {
//     console.log('-- 서버 배포모드로 WEBPACK이 실행됩니다! --');
// }
// module.exports = {
//     entry:
//         {
//             // 'product/app': ['@babel/polyfill', './src/product/'],
//             // 'promotion/app': ['@babel/polyfill', './src/'],
//             'landing/app': ['@babel/polyfill', './src/landing'],
//             // 'app': ['@babel/polyfill', './src/test']
//         }
//     ,
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: !deployEnv ? "[name].bundle.js" : "[name].[chunkhash].bundle.js",
//         chunkFilename: '[id].[chunkhash].js',
//         publicPath: "/dist/"
//     },
//     devtool: "source-map",
//     devServer: {
//         inline: true,
//         port: 7777,
//         historyApiFallback: true,
//     },
//     resolve: {
//         extensions: [".ts", ".tsx", ".js", ".json"]
//     },
//     module: {
//         rules: [
//             // {
//             //     enforce: "pre",
//             //     loader: 'eslint-loader',
//             //     test: /\.js$/,
//             //     exclude: /node_modules/
//             //     에러 미침;
//             // },
//             {
//                 test: /\.tsx?$/,
//                 loader: "awesome-typescript-loader"
//             },
//             {
//                 enforce: "pre",
//                 loader: "source-map-loader",
//                 test: /\.js$/,
//             },
//             {
//                 loader: 'babel-loader',
//                 test: /\.js$/,
//                 exclude: /node_modules/
//             },
//             // {
//             //     test: /\.scss$/,
//             //     use: [
//             //         {
//             //             loader:'style-loader'
//             //         },
//             //         ExtractCssChunks.loader,
//             //         {
//             //             loader: 'css-loader',
//             //             options: {
//             //                 modules: true,
//             //                 localIdentName: '[name]__[local]--[hash:base64:5]',
//             //             },
//             //         },
//             //         {
//             //             loader: 'sass-loader',
//             //         }
//             //     ]
//             // }, css 청크화 시킴, 밑에 plugin 끄기 관련된 .
//             {
//                 test: /\.scss$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: 'style-loader',
//                     use: [
//                         {
//                             loader: 'css-loader',
//
//                             options: {
//                                 modules: !deployEnv ? 'false' : 'true',
//                                 localIdentName: !deployEnv ? null : '_[hash:base64:11]',
//                                 sourceMap: true,
//                                 minimize: true,
//                             }
//                         },
//                         {
//                             loader: 'sass-loader'
//                         }
//                     ]
//                 }),
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//                 loader: 'url-loader',
//                 options: {
//                     name: '[hash:base64:8].[ext]',
//                     publicPath: '/dist/images/',
//                     outputPath: 'images/',
//                     limit: !deployEnv ? 1000000 : 100000,
//                 }
//             },
//         ]
//     },
//     plugins: [
//         // new ExtractCssChunks( css청크
//         //     {
//         //         filename: "[name].css",
//         //         chunkFilename: "[id].css",
//         //         hot: true
//         //     }
//         // ),
//         new ExtractTextPlugin({
//             filename: !deployEnv ? '[name].bundle.css' : '[name].[chunkhash].bundle.css',
//             allChunks: true
//         }),
//         new ManifestPlugin({
//             filename: 'assets.json',
//             basePath: '/'
//         }),
//         // new HtmlWebpackPlugin({
//         //     filename: '../index.html',
//         //     inject: true,
//         //     template: './index.html',
//         //     title: 'LITTLEONE, next level parenting',
//         // }),
//     ],
//     optimization: deployEnv ?{
//         splitChunks: {
//             chunks: 'async',
//             minSize: 30000,
//             minChunks: 1,
//             maxAsyncRequests: 5,
//             maxInitialRequests: 3,
//             automaticNameDelimiter: '~',
//             name: true,
//             cacheGroups: {
//                 vendors: {
//                     test: /node_modules/,
//                     priority: -10
//                 },
//                 default: {
//                     minChunks: 2,
//                     priority: -20,
//                     reuseExistingChunk: true
//                 }
//             }
//         }
//     }:void(0)
// };