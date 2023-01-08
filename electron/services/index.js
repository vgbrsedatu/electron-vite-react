/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Main file to export all electron services to main proccess.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import logger from './logger';
import * as squirrel from './squirrel';
import * as update from './update';

// ━━ EXPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { logger };
export { squirrel };
export { update };
