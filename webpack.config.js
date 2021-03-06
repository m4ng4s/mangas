var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  // entry: [
  //   'react-hot-loader/patch',
  //   'webpack-dev-server/client?http://localhost:3000',
  //   'webpack/hot/only-dev-server',
  //   './src/index'
  // ],
  entry: './src/index.jsx',
  output: {
    // path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/static/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    // new webpack.DefinePlugin({
    //    'process.env': {
    //      'NODE_ENV': JSON.stringify('production')
    //    }
    //  })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.js?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'lib')
    },{
      test: /\.(css)$/,
      loader: 'style!css'
    }]
  }
};
