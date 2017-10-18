const rewireMobX = require('react-app-rewire-mobx');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireEslint = require('./rewire/react-app-rewire-eslint');
const rewirePolyfills = require('react-app-rewire-polyfills');
const rewireLess = require('./rewire/react-app-rewire-less');
const rewireSass = require('./rewire/react-app-rewire-sass');
const rewireCSS = require('./rewire/react-app-rewire-css-scss');
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
  config = rewireEslint(config, env);
  if (env !== 'local') {
    config = rewirePolyfills(config, env);
  }
  return config;
};
