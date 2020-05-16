// Libraries
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

// Files
const utils = require('./utils');

// Configuration
module.exports = env => {
  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '',
      filename: 'assets/[name].js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
    },
    devtool: (env.NODE_ENV === 'development') ? 'source-map' : false,
    resolve: {
      extensions: ['.js', '.css', '.scss'],
      alias: {
        source: path.resolve(__dirname, '../src'), // Relative path of src
        images: path.resolve(__dirname, '../src/assets/images'), // Relative path of images
        fonts: path.resolve(__dirname, '../src/assets/fonts'), // Relative path of fonts
      }
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    /*
      Loaders with configurations
    */
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {presets: ['@babel/preset-env']}
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {importLoaders: 1}},
            {
              loader: 'sass-loader',
              options: {
                importer: globImporter()
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          loaders: [
            'pug-loader',
            {
              loader: 'pug-html-loader',
              options: {
                data: {
                  menu: require('../src/views/data/menu.json'),
                  menuAbout: require('../src/views/data/menuAbout.json'),
                  menuClients: require('../src/views/data/menuClients.json'),
                  menuWhereBuy: require('../src/views/data/menuWhereBuy.json'),
                  menuAside: require('../src/views/data/menuAside.json'),
                  index: require('../src/views/data/index.json'),
                },
                pretty: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loaders: [
            {
              loader: 'url-loader',
              options: {
                limit: 3000,
                name: 'images/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(mp4)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/videos/[name].[ext]'
          }
        },
        {
          test: /\.(glsl|frag|vert)$/,
          use: ['glslify-import-loader', 'raw-loader', 'glslify-loader']
        },
        {
          test: /three\/examples\/js/,
          use: 'imports-loader?THREE=three'
        },
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            filename: 'assets/vendor.js',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    plugins: [
      new CopyWebpackPlugin([
        {from: 'assets/images/favicons/favicon.ico', to: ''},
        {from: 'assets/images', to: 'assets/images'},
        {from: 'assets/fonts', to: 'assets/fonts'},
      ]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: '70'
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true
          })
        ]
      }),
      new SVGSpritemapPlugin('sprites/**/*.svg', {
        styles: path.join(__dirname, '../src/assets/styles/_sprites.scss')
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css',
        chunkFilename: 'assets/vendors.css',
      }),

      /*
        Pages
      */
      ...utils.pages(env.NODE_ENV),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
        'THREE': 'three'
      }),

      new HtmlBeautifyPlugin({
        config: {
          html: {
            end_with_newline: true,
            indent_size: 2,
            indent_with_tabs: true,
            indent_inner_html: true,
            preserve_newlines: true
          }
        },
        replace: [ ' type="text/javascript"' ]
      }),

      new WebpackNotifierPlugin({
        title: 'Noob__ui'
      }),
    ]
  }
};
