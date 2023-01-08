/**
 * @author Victor Giovanni Beltrán Rodríguez.
 * @file Manages all menus for electron app.
 */

// ━━ IMPORT PACKAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT ELECTRON APIS
const { Menu } = require('electron');

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `context()` function generally, the template is an array of options for
 * constructing a MenuItem. The usage can be referenced above.
 *
 * @private
 * @example createTray(options);
 *
 */
const context = app =>
  Menu.buildFromTemplate([
    {
      label: 'Cerrar',
      type: 'normal',
      click: () => {
        app.quit();
      },
    },
  ]);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.context = context;
