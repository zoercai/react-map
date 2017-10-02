const { getLoader } = require('react-app-rewired');
const path = require('path');


function rewireLess(config, env, options={}) {
  const lessExtension = /\.less$/;
  const fileLoader = getLoader(
    config.module.rules, rule => rule.loader && typeof rule.loader === 'string' && rule.loader.endsWith(`file-loader${path.sep}index.js`)
  );
  fileLoader.exclude.push(lessExtension);

  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: options,
        }
      ]
    }
  )
  return config;
}
module.exports = rewireLess;