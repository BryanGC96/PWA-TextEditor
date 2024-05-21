// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const path = require('path');
// const { InjectManifest } = require('workbox-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// //////////////////////////////////////////////////////////////////
// // TODO: Add and configure workbox plugins for a service worker and manifest file.
// // TODO: Add CSS loaders and babel to webpack.
// ///////////////////////////////////////////////////////////////
// module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js'
//     },
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//       publicPath: '/',
//     },
//     plugins: [
//       new CleanWebpackPlugin(), // Cleans previous builds using the dependency 'clean-webpack-plugin'.

//       new HtmlWebpackPlugin({
//         template: path.resolve(__dirname, '../client/index.html'),
//         inject: 'body',
//       }),

//       new WebpackPwaManifest({ // Generates 'manifest.json' file.
//         name: 'JATE',
//         short_name: 'JATE',
//         description: 'Just Another Text Editor',
//         background_color: '#ffffff',
//         theme_color: '#31a9e1',
//         start_url: '/',
//         display: 'standalone',
//         icons: [
//           {
//             src: path.resolve('src/images/logo.png'),
//             sizes: [96, 128, 192, 256, 384, 512],
//             destination: path.join('icons'),
//           },
//         ],
//         filename: 'manifest.json',
//       }),
//       new InjectManifest({ // Generates service worker from 'src-sw.js'
//         swSrc: './src-sw.js',
//         swDest: 'service-worker.js',
//       }),
//     ],

//     module: {
//       rules: [
//         {
//           test: /\.css$/i,
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           test: /\.(png|svg|jpg|jpeg|gif)$/i,
//           type: 'asset/resource',
//         },
//         {
//           test: /\.m?js$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env'],
//               plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
//             },
//           },
//         },
//       ],
//     },
//   };
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    // devServer: {
    //   static: {
    //     directory: path.join(__dirname, 'dist'),
    //   },
    //   compress: true,
    //   port: 8080,
    //   hot: true,
    //   open: true,
    //   devMiddleware: {
    //     writeToDisk: true, // Ensures files are written to disk
    //   },
    // },
    plugins: [

      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: 'index.html',
        // inject: 'body',
      }),

      new WebpackPwaManifest({
        id: '/',
        inject: true ,
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor takes notes with JavaScript syntax highlighting!',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
        filename: 'manifest.json',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ]//.filter(Boolean)
,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
