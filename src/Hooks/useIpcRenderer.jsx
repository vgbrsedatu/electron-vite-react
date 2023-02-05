/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useIpcRenderer` custom React Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useState, useEffect } from 'react';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The channels which the custom hook will communicate to send and receive
 * information from `ipcMain`.
 *
 * @typedef   {object}  channels
 * @property  {string}  subscribe - The channel that will receive information from `ipcMain`.
 * @property  {string}  send      - The `ipcMain` channel that will receive the information.
 */

/**
 * The returns value from `useIpcRenderer` Hook.
 *
 * @typedef   {Array}   IpcRendererHook
 * @property  {string}  IpcRendererHook.0           - The channel that will receive information from `ipcMain`.
 * @property  {string}  IpcRendererHook.1    - The `ipcMain` channel that will receive the information.
 */

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Reference to the `electron.contextBridge.exposeInMainWorld` module.
 *
 * @type {*}
 */
const contextBridge = window.appRuntime;

// ━━ CUSTOM REACT HOOK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useIpcRenderer` it's a custom React hook, communicates with the
 * `electron.ipcMain` module, used to manage some state which requires
 * communication between the `main` process and the `render` process.
 *
 * The channels property, are the names of the channels with which the hook
 * will communicate, a channel must be configured to receive information from
 * `ipcMain` and another to send it to `ipcMain`.
 *
 * @param {object} options - Hook configuration options.
 * @param {channels} options.channels - The names of the ipcMain channels.
 * @param {*} options.initial - The initial value of the state to manage.
 * @returns {IpcRendererHook} An array with a initial state and a function to update its value.
 */
const useIpcRenderer = options => {
  const { channels, initial } = options;
  const [state, setState] = useState(initial);

  useEffect(() => {
    const handleIpc = (_, payload) => {
      setState(payload);
    };
    contextBridge.subscribe(channels.subscribe, handleIpc);
    return () => contextBridge.remove(channels.subscribe, handleIpc);
  }, [channels]);

  useEffect(() => {
    contextBridge.send(channels.send, state);
  }, [state, channels]);

  const updateState = update => {
    setState(update);
  };

  return [state, updateState];
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useIpcRenderer;
