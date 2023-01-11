/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Header` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT CUSTOM HOOKS
import useVersions from '../../Hooks/useVersions';
import useAbout from '../../Hooks/useAbout';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Versions` component.
 *
 * @component
 * @returns {JSX.Element} The `Versions` components.
 */
const Versions = () => {
  const versions = useVersions();
  return (
    <nav>
      <ul className="version">
        <li className="version__item">
          Electron <span id="electron-version">{versions?.electron}</span>
        </li>
        <li className="version__item">
          Chromium <span id="chrome-version">{versions?.chrome}</span>
        </li>
        <li className="version__item">
          Node <span id="node-version">{versions?.node}</span>
        </li>
        <li className="version__item">
          V8 <span id="v8-version">{versions?.v8}</span>
        </li>
      </ul>
    </nav>
  );
};

/**
 * The `Figure` component.
 *
 * @component
 * @returns {JSX.Element} The `Figure` components.
 */
const Figure = () => (
  <figure className="logo">
    <img src="./assets/images/svg/react.svg" className="logo__img" alt="Electron logo" />
  </figure>
);

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

/**
 * The `Header` component.
 *
 * @component
 * @returns {JSX.Element} The `Header` components.
 */
const Header = () => (
  <header id="header-wrapper">
    <Versions />
    <Figure />
    <Titles />
  </header>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Header;
