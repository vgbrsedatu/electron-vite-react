/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useWindowState` a custom Reack Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useEffect, useState } from 'react';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The returns value from `useWindowState`
 *
 * @typedef {Object} WindowStateResponse
 * @property {boolean} maximize - If the window state is maximized, Default value is `false`.
 * @property {boolean} fullScreen - If the window state is fullscreened, Default value is `false`.
 * @property {function():void} closeWindow - A function that sends a signal to ipcMain to close the window.
 * @property {function():void} minimizeWindow - A function that sends a signal to ipcMain to minimize the window.
 * @property {function():void} maximizeWindow - A function that sends a signal to ipcMain to maximize the window.
 */
// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useWindowState` it's a custom React hook witch communicates with the
 * `electron` api, used to manage window states.
 *
 * @returns {WindowStateResponse}
 */
const useWindowState = () => {
  const [maximize, setMaximize] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handleEvent = (event, payload) => {
      setMaximize(payload);
    };
    window.appRuntime.subscribe('window-maximize:reply', handleEvent);
    return () => {
      window.appRuntime.unsubscribe('window-maximize:reply', handleEvent);
    };
  }, []);

  useEffect(() => {
    const handleEvent = (event, payload) => setFullScreen(payload);
    window.appRuntime.subscribe('window-fullscreen:reply', handleEvent);
    return () => {
      window.appRuntime.unsubscribe('window-fullscreen:reply', handleEvent);
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

  return { maximize, fullScreen, closeWindow, minimizeWindow, maximizeWindow };
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useWindowState;
