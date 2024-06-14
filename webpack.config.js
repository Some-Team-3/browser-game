const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'scripts', 'runApp.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sounds/[name][ext]',
        },
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
