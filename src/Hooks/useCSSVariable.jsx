/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useCSSVariable` custom React Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useState, useEffect } from 'react';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 *  The new value for the CSS variable.
 *
 * @typedef   {string}  state
 */

/**
 * Function to update the CSS variable.
 *
 * @typedef   {React.Dispatch<React.SetStateAction<string>>}  dispatch
 */

/**
 * The returns from `useCSSVariable`, a stateful value, and a function to update
 * it.
 *
 * @typedef   {[state, dispatch]}  CSSVariableHook
 */

// ━━ CUSTOM REACT HOOK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useCSSVariable` it's a custom hook for updating CSS variables.
 *
 * @param {string} name - The name of the CSS variable to update.
 * @param {string} initial - The new value for the CSS variable.
 * @returns {CSSVariableHook} Returns a stateful value, and a function to update it.
 */
const useCSSVariable = (name, initial) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    document.documentElement.style.setProperty(`--${name}`, state);
  }, [name, state]);

  return [state, setState];
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useCSSVariable;
