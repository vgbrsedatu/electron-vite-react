/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file To Create a safe, bi-directional, synchronous bridge across isolated
 * contexts. The preload script runs before. It has access to web APIs as well
 * as Electron's renderer process modules and some polyfilled Node.js functions.
 *
 */
// ━━ IMPORT PACKAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT ELECTRON APIS
const { contextBridge, ipcRenderer } = require('electron');

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const app = {
  name: 'Electron app',
  description: 'Starter template for electron project',
  team: 'BRSoft Electron',
  company: 'BRSoft',
  copyright: 'Copyright © 2014-2020',
  version: '1.0.0',
  autor: 'Victor G. Beltrán Rodríguez',
};

const versions = {
  chrome: process.versions.chrome,
  node: process.versions.node,
  electron: process.versions.electron,
  v8: process.versions.v8,
};

// » CREATE CONTEXT BRIDGE
contextBridge.exposeInMainWorld('appRuntime', {
  versions,
  app,
  send: (channel, payload) => ipcRenderer.send(channel, payload),
  invoke: (channel, payload) => ipcRenderer.invoke(channel, payload),
});
