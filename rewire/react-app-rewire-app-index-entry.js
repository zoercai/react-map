function rewireAppIndexEntry(config, env) {
  const DEFAULT = 'src/index.js';
  if (process.env.APP_INDEX_JS) {
    config.entry.forEach((entry, i) => {
      if (entry.endsWith(DEFAULT)) {
        config.entry[i] = entry.replace(DEFAULT, process.env.APP_INDEX_JS);
      }
    });
  }
  return config;
}
module.exports = rewireAppIndexEntry;
