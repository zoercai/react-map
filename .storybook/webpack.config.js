const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-cssnext')(),
                require('postcss-reporter')(),
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['sass-loader']
      },
    ]
  }
}
