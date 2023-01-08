/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Main file to export all electron system to main proccess.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import * as dialog from './dialog';
import * as file from './file';
import * as menu from './menu';
import * as notification from './notification';
import * as tray from './tray';

// ━━ EXPORT PACKAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { dialog };
export { file };
export { menu };
export { notification };
export { tray };
