/**
 * @author Victor Giovanni Beltrán Rodríguez.
 * @file Manages electron native system dialogs the modules are separated by
 * synchronous and asynchronous.
 */

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.async = require('./async');
exports.sync = require('./sync');
