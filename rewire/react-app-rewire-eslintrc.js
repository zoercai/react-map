const { getLoader } = require('react-app-rewired');

const cssLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf('eslint-loader') !== -1;
};

function rewireEslintrc(config, env) {
  const cssLoader = getLoader(config.module.rules, cssLoaderMatcher);
  cssLoader.options.useEslintrc = true;
  return config;
}
module.exports = rewireEslintrc;
