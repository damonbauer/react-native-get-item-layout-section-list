const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const packageSrcDir = path.resolve(projectRoot, '..', 'src');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    nodeModulesPaths: [packageSrcDir],
  },
  watchFolders: [packageSrcDir],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
