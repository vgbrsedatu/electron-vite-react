/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage settings for the property `makers` on `electron-forge`
 */

const squirrel = require('./squirrel');

const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: squirrel,
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    name: '@electron-forge/maker-deb',
    config: {},
  },
  {
    name: '@electron-forge/maker-rpm',
    config: {},
  },
];

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = makers;
