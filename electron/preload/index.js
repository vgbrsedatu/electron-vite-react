/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file To Create a safe, bi-directional, synchronous bridge across isolated
 * contexts. The preload script runs before. It has access to web APIs as well
 * as Electron's renderer process modules and some polyfilled Node.js functions.
 *
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT ELECTRON APIS
import { contextBridge, ipcRenderer } from 'electron';

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `about` constant, contains information about the application, such as
 * developers or description.
 *
 * @constant {object} about
 */
const about = {
  name: 'Electron app',
  description: 'Starter template for electron project',
  team: 'BRSoft Electron',
  company: 'BRSoft',
  copyright: 'BRSoft© 2014-2020',
  version: '1.0.0',
  author: 'Victor G. Beltrán Rodríguez',
};

/**
 * The `versions` constant, contains information about the versions of the
 * application.
 *
 * @constant {object} versions
 */
const versions = {
  chrome: process.versions.chrome,
  node: process.versions.node,
  electron: process.versions.electron,
  v8: process.versions.v8,
};

/**
 * The `apiKey` constant, it's the key to inject the API onto `window` with. The
 * API will be accessible on `window[apiKey]`.
 *
 * @constant {string} apiKey
 */
const apiKey = 'appRuntime';

/**
 * The api provided to exposeInMainWorld must be a Function, string, number,
 * Array, boolean, or an object whose keys are strings and values are a
 * Function, string, number, Array, boolean, or another nested object that meets
 * the same conditions.
 *
 * @constant {object} api
 */
const api = {
  about,
  versions,
  send: (channel, payload) => ipcRenderer.send(channel, payload),
  sendSync: (channel, payload) => ipcRenderer.sendSync(channel, payload),
  invoke: (channel, listener) => ipcRenderer.invoke(channel, listener),
  subscribe: (channel, listener) => ipcRenderer.on(channel, listener),
  subscribeOnce: (channel, listener) => ipcRenderer.once(channel, listener),
  remove: (channel, listener) => ipcRenderer.removeListener(channel, listener),
  removeAll: channel => ipcRenderer.removeAllListeners(channel),
  once: (channel, listener) => {
    const subscription = (event, ...args) => listener(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

// ━━ CONTEXTBRIDGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
contextBridge.exposeInMainWorld(apiKey, api);
