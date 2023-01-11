/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Titles` React component.
 */
// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT CUSTOM HOOKS
import useAbout from '../../../../Hooks/useAbout';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Titles` component.
 *
 * @component
 * @returns {JSX.Element} The `Titles` components.
 */
const Titles = () => {
  const about = useAbout();
  return (
    <header className="title-app">
      <h2 className="title-app__presentation">AN APPLICATION WITH ELECTRON AND REACT</h2>
      <h4 id="app-description" className="title-app__description">
        {about?.description}
      </h4>
    </header>
  );
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Titles;
