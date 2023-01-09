/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useWindowState` a custom Reack Hook.
 */
// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { useEffect, useState } from 'react';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The returns value from `useAbout`
 *
 * @typedef   {Object}  useVersions
 * @property  {string}  chrome      - The `chrome` version.
 * @property  {string}  node        - The `node` version.
 * @property  {string}  electron    - The `electron` version.
 * @property  {string}  v8          - The `v8` version.
 */

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useVersions` it's a custom React hook witch communicates with the
 * `electron` api, used to manages versions state.
 *
 * @returns {VersionsResponse} Information about the versions application.
 */
const useVersions = () => {
  const [versions, setVersions] = useState(null);

  useEffect(() => {
    setVersions(window.appRuntime.versions);
  }, []);

  return { versions };
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useVersions;
