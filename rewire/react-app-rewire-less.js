const { getLoader, loaderNameMatches } = require('react-app-rewired');

function rewireLess(config, env, options = {}) {
  const lessExtension = /\.less$/;
  const fileLoader = getLoader(
    config.module.rules,
    rule => loaderNameMatches(rule, 'file-loader')
  );
  fileLoader.exclude.push(lessExtension);

  const lessLoader = {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options,
      },
    ],
  };
  config.module.rules.push(lessLoader);
  return config;
}
module.exports = rewireLess;
