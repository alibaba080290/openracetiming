// webpack.config.js
const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync({ ...env }, argv);

  /* Polyfills Node déjà présents … */
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer/'),
    util: require.resolve('util'),
    process: require.resolve('process/browser'),
    vm: require.resolve('vm-browserify'),
  };

  /* Alias : toutes les variantes pointent vers le shim */
  const shim = path.resolve(__dirname, 'src/shims/nanoid-named.js');
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'nanoid/non-secure': shim,
    'nanoid/non-secure/index': shim,
    'nanoid/non-secure/index.js': shim,
  };

  return config;
};
