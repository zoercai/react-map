const rewireMobX = require('react-app-rewire-mobx');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('./rewire/react-app-rewire-less');
const rewireSass = require('./rewire/react-app-rewire-sass');
const rewireCSS = require('./rewire/react-app-rewire-css-scss');
const rewireEslintrc = require('./rewire/react-app-rewire-eslintrc');
const rewireAppIndexEntry = require('./rewire/react-app-rewire-app-index-entry');
const antTheme = require('./ant-theme');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireCSS(config, env);
  config = rewireSass(config, env);
  config = rewireLess(config, env, {
    modifyVars: antTheme,
  });
  config = rewireAppIndexEntry(config, env);
  config = rewireEslintrc(config, env);
  return config;
};
