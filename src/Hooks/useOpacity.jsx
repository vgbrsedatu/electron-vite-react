/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useOpacity` custom React Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useEffect } from 'react';

// » IMPORT CUSTOM HOOKS
import useStorage from './useStorage';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A function to change `opacity` value.
 *
 * @typedef   {(value:string) => void} changeOpacity
 */

/**
 * The returns value from `useOpacity` Hook
 *
 * @typedef   {object}        opacityHook
 * @property  {string}        opacity         - The current `opacity` value.
 * @property  {changeOpacity} changeOpacity   - A function to change `opacity` value.
 */

// ━━ CUSTOM REACT HOOK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useOpacity` it's a custom React hook witch communicates with the
 * `electron.ipcMain` module, used to manage opacity state.
 *
 * @returns {opacityHook} An object to opacity state manage.
 */
const useOpacity = () => {
  const [opacity, setOpacity] = useStorage('opacity', 1);

  useEffect(() => {
    window.appRuntime.send('opacity', opacity);
  }, [opacity]);

  const changeOpacity = value => {
    setOpacity(parseFloat(value));
  };

  return { opacity, changeOpacity };
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useOpacity;
