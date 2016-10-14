module.exports = {
  entry: './public/javascripts/react-flip-move-test.js',
  output: {
    path: './public/dist/',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
