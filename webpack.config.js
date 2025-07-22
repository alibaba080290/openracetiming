// webpack.config.js
/* eslint-env node */
const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  /* Config Expo de base ---------------------------------------------- */
  const config = await createExpoWebpackConfigAsync({ ...env }, argv);

  /* ------------------------------------------------------------------ *
   * 1) Polyfills Node (crypto, stream, …)                              *
   * ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ *
   * 2) Alias pour nanoid (corrige le bug _nonSecure.nanoid)            *
   * ------------------------------------------------------------------ */
  const shim = path.resolve(__dirname, 'src/shims/nanoid-named.js');
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'nanoid/non-secure': shim,
    'nanoid/non-secure/index': shim,
    'nanoid/non-secure/index.js': shim,

    /* -------------------------------------------------------------- *
     * 3) Alias pour react-native-vector-icons                        *
     *    – évite les warnings sur web                                *
     * -------------------------------------------------------------- */
    // 3-a : redirige les « MaterialCommunityIcons » vers Expo
    '@react-native-vector-icons/material-design-icons':
      '@expo/vector-icons/MaterialCommunityIcons',

    // 3-b : module natif absent – on le déclare vide côté Web
    '@react-native-vector-icons/get-image': false,
  };

  return config;
};
