/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Main` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT COMPONENTS
import Router from '../../Routes/Router';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Main` component.
 *
 * @component
 * @returns {JSX.Element} The `Main` components.
 */
const Main = () => (
  <main id="container">
    <Router />
  </main>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Main;
