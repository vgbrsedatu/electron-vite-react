/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `WindowContext` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » WINDOW CONTEXT
/**
 * The context where the current window state will be stored.
 *
 * @type {React.Context}
 */
const WindowContext = createContext();

// ━━ PROVIDER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WindowProvider = ({ children }) => {
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

  const value = useMemo(
    () => ({
      maximize,
      fullScreen,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      openWindow,
    }),
    [maximize, fullScreen],
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
};

WindowProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

/**
 * The `Window` argument allows the dialog to attach itself to a parent
 * window, making it modal.
 *
 * @typedef {object} WindowContext
 * @property  {boolean} maximize - Its value is `true` if the window is maximized, otherwise, `false`.
 * @property  {boolean} fullScreen -  Its value is `true` if the window is fullscreened, otherwise, `false`.
 * @property  {()=> void} closeWindow - A `function` to close the current window.
 * @property  {()=> void} minimizeWindow - A `function` to minimize the current window.
 * @property  {()=> void} maximizeWindow - A `function` to maximize/restore the current window.
 * @property  {(view:string)=> void} openWindow - A `function` to open a modal window.

 */

/**
 * The `useWindowControls` custom Hook, is a consumer of `WindowContext`,
 * contains values and functions like maximizing, minimizing, restoring and
 * closing the window.
 *
 * @returns {WindowContext} An `Object` with values and functions to manage the state of the current window.
 */
const useWindowConsumer = () => {
  /**
   * @type {WindowContext}
   */
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowConsumer must be within the WindowContext provider');
  }
  return context;
};

/**
 * An `Object` with the values of the current window state.
 *
 * @typedef {object} WindowState
 * @property  {boolean} maximize - Its value is `true` if the window is maximized, otherwise, `false`.
 * @property  {boolean} fullScreen -  Its value is `true` if the window is fullscreened, otherwise, `false`.
 */

/**
 * The `useWindowState` custom Hook, is a consumer of `WindowContext`,
 * contains an object with the values of the current window state.
 *
 * @returns {WindowState} An `Object` with the values of the current window state.
 */
const useWindowState = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowState must be within the WindowContext provider');
  }
  /**
   * @type {WindowState}
   */
  const state = {
    maximize: context.maximize,
    fullScreen: context.fullScreen,
  };
  return state;
};

/**
 * An `Object` with functions to manage the state of the current window.
 *
 * @typedef {object} WindowControls
 * @property  {()=> void} closeWindow - A `function` to close the current window.
 * @property  {()=> void} minimizeWindow - A `function` to minimize the current window.
 * @property  {()=> void} maximizeWindow - A `function` to maximize/restore the current window.
 * @property  {(view:string)=> void} openWindow - A `function` to open a modal window.
 */

/**
 * The `useWindowControls` custom Hook, is a consumer of `WindowContext`,
 * contains functions like maximizing, minimizing, restoring and closing the
 * current window.
 *
 * @returns {WindowControls} An `Object` with functions to manage the state of the current window.
 */
const useWindowControls = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowControls must be within the WindowContext provider');
  }
  /**
   * @type {WindowControls}
   */
  const controls = {
    closeWindow: context.closeWindow,
    minimizeWindow: context.minimizeWindow,
    maximizeWindow: context.maximizeWindow,
    openWindow: context.openWindow,
  };
  return controls;
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default WindowProvider;
export { useWindowConsumer, useWindowState, useWindowControls };
