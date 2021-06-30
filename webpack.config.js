var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/i,
          use: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|svg|jpeg|img|gif)$/i,
          type: 'asset/resource',
        },
        ]
    },
    mode: 'development',
   devServer: {
    historyApiFallback: true
  },
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

    ],
}
