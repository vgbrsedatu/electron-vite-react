/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Home` React component view.
 */
// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT COMPONENTS
import Dialog from './Dialog';
import Notification from './Notification';
import Opacity from './Opacity';
import ToogleTheme from './ToogleTheme';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Home` react component view.
 *
 * @component
 * @returns {JSX.Element} The `Home` components.
 */
const Home = () => (
  <section className="features">
    <Opacity />
    <ToogleTheme />
    <Notification />
    <Dialog />
  </section>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Home;
