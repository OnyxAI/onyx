// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const OfflinePlugin = require('offline-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'src/bootstrap.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'onyx',
      library: { type: 'var', name: 'onyx' },
      filename: 'remoteEntry.js',
      exposes: {
        utils: path.resolve(process.cwd(), './src/utils/index.js'),
      },
      shared: [
        'react',
        'react-dom',
        'react-intl',
        'react-redux',
        'redux',
        'reselect',
        'react-materialize',
        'materialize-css',
      ],
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new WebpackPwaManifest({
      name: 'Onyx AI',
      short_name: 'Onyx',
      description: 'Intelligent Dashboard !',
      background_color: '#fafafa',
      theme_color: '#b1624d',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve('src/assets/img/logo/indigo.png'),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: path.resolve('src/assets/img/logo/indigo.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),
  ],
  externals: /^(@neurons|neurons)$/i,
  alias: {
    '@onyx': path.resolve(process.cwd(), './src'),
    '@neurons$': path.resolve(process.cwd(), './neurons'),
  },

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
