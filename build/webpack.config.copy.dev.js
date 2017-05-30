var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var vueLoaderConfig
const config = {
  entry: {
      example: ['./src/example/main.js'],
      vendor: ['vue'],
  },
  output: {
    path: path.resolve(__dirname, "../example"),
    publicPath: '/',
    filename: '[name].build.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass',
        exclude: path.resolve(__dirname, "../node_modules")
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : "'development'"
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  devtool: 'source-map',
  performance: {
    hints: false
  },
  /*devServer: {
    contentBase: '/example/'
  }*/
}

module.exports = config