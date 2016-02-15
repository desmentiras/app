var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var PurifyCssPlugin = require('purifycss-loader/PurifyCssPlugin')

var isDev = process.env.NODE_ENV === 'development'

var htmlIndex = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'src/index.html'
})

var devServer = isDev ? [
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8090'
] : []

var cssLoader = isDev ? 'css' : 'css?minimize'
var purifyCssLoader = isDev ? '' : 'purifycss'

module.exports = {
  devtool: 'eval-source-map',

  context: __dirname,

  entry: devServer.concat(['./src/App']),

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'desmentiras.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: /src/,
        query: {
          cacheDirectory: true,
          plugins: ['syntax-decorators'],
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', cssLoader, 'autoprefixer', purifyCssLoader]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7interlaced=false'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'containers': path.join(__dirname, 'src', 'containers'),
      'components': path.join(__dirname, 'src', 'components'),
      'styles': path.join(__dirname, 'src', 'styles'),
      'reducers': path.join(__dirname, 'src', 'reducers'),
      'actions': path.join(__dirname, 'src', 'actions'),
      'utils': path.join(__dirname, 'src', 'utils'),
      'meta': path.join(__dirname, 'src', 'meta')
    }
  },

  plugins: [
    htmlIndex,
    new webpack.HotModuleReplacementPlugin(),
    new PurifyCssPlugin(__dirname, '/src/index.html')
  ],

  devServer: {
    host: 'localhost',
    port: 8090,
    contentBase: 'build',
    filename: 'desmentiras.js',
    hot: true,
    historyApiFallback: {
      rewrites: [
        {from: /\/images/, to: './images'}
      ]
    },
    start: {
      keepAlive: true
    }
  }
}
