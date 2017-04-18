var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'js/[name].bundle.js',
    // publicPath: '/assets/',
    library: 'Scada',
    libraryTarget: 'umd'
  },
  devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true
    },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'homepage.html',
      template: 'template.html',
      inject: 'head'
    })
  ]
};
