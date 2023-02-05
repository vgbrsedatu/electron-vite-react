/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useWindow` a custom React Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useEffect, useState } from 'react';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A function that sends a signal to ipcMain to close the window.
 *
 * @typedef {() => void} closeWindow
 */

/**
 * A function that sends a signal to ipcMain to minimize the window.
 *
 * @typedef {() => void} minimizeWindow
 */

/**
 * A function that sends a signal to ipcMain to maximize/restore the window.
 *
 * @typedef {() => void} maximizeWindow
 */

/**
 * A function that sends a signal to ipcMain to open a Window.
 *
 * @typedef {(view:string) => void} openWindow
 */

/**
 * An object with functions to minimize maximize and close the window.
 *
 * @typedef   {object}          controls
 * @property  {closeWindow}     closeWindow     - A function that sends a signal to ipcMain to close the window.
 * @property  {minimizeWindow}  minimizeWindow  - A function that sends a signal to ipcMain to minimize the window.
 * @property  {maximizeWindow}  maximizeWindow  - A function that sends a signal to ipcMain to maximize/restore the window.
 * @property  {openWindow}      openWindow      - A function that sends a signal to ipcMain to open a Window.
 */

/**
 * The returns value `useWindow`
 *
 * @typedef   {object}    windowHook
 * @property  {boolean}   maximize    - If the window state is maximized, Default value is `false`.
 * @property  {boolean}   fullScreen  - If the window state is fullscreened, Default value is `false`.
 * @property  {controls}  controls    - An object with functions to minimize maximize and close the window.
 */

// ━━ CUSTOM REACT HOOK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useWindow` it's a custom React hook witch communicates with the
 * `electron` api, used to manage window states.
 *
 * @returns {windowHook}
 */
const useWindow = () => {
  const [maximize, setMaximize] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handler = (event, payload) => {
      setMaximize(payload);
    };
    window.appRuntime.subscribe('window-maximize', handler);
    return () => {
      window.appRuntime.removeAll('window-maximize');
    };
  }, []);

  useEffect(() => {
    const handler = (event, payload) => {
      setFullScreen(payload);
    };
    window.appRuntime.subscribe('window-fullscreen', handler);
    return () => {
      window.appRuntime.removeAll('window-fullscreen');
    };
  }, []);

  const closeWindow = () => {
    window.appRuntime.send('window-close');
  };

  const minimizeWindow = () => {
    window.appRuntime.send('window-minimize');
  };

  const maximizeWindow = () => {
    window.appRuntime.send('window-maximize');
  };

  const openWindow = view => {
    window.appRuntime.send('window-open', view);
  };

  return {
    maximize,
    fullScreen,
    controls: {
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      openWindow,
    },
  };
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useWindow;
