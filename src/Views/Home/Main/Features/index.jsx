/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Features` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT COMPONENTS
import Dialog from './Dialog';
import Notification from './Notification';
import Opacity from './Opacity';
import ToogleTheme from './ToogleTheme';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Features` component.
 *
 * @component
 * @returns {JSX.Element} The `Features` components.
 */
const Features = () => (
  <section className="features">
    <Opacity />
    <ToogleTheme />
    <Notification />
    <Dialog />
  </section>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Features;
