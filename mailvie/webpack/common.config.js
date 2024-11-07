const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),
  entry: {
    project: path.resolve(__dirname, '../mailvie/static/js/project'),
    vendors: path.resolve(__dirname, '../mailvie/static/js/vendors'),
    react: path.resolve(__dirname, "../main"),
  },
  output: {
    path: path.resolve(
      __dirname,
      '../mailvie/static/webpack_bundles/',
    ),
    publicPath: '/static/webpack_bundles/',
    filename: 'js/[name]-[fullhash].js',
    chunkFilename: 'js/[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, '../')),
      filename: 'webpack-stats.json',
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
  ],
  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader', // Use TypeScript loader
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|json)$/i,
        // type: 'asset/resource', // This will handle images and JSON
        include: path.resolve(__dirname, '../mailvie/static/assets'), // Include your assets directory
        type: 'asset/resource', // Use asset/resource type to emit files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'autoprefixer', 'pixrem'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',

    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add TypeScript extensions
  },
  stats: {
    errorDetails: true,
  },
};
