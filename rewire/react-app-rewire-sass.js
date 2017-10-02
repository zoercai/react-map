function rewireSass(config, env, options = {}) {
  const sassLoader = {
    test: /\.scss$/,
    loader: 'sass-loader',
    options,
  };
  config.module.rules.push(sassLoader);

  return config;
}
module.exports = rewireSass;
