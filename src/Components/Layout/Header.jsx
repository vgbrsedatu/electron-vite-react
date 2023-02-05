/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Header` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';

// » IMPORT CONTEXT
import { useSignout } from '../../Context/AuthContext';

// » IMPORT CUSTOM HOOKS
import useModal from '../../Hooks/useModal';

// » IMPORT CUSTOM HOOKS
import useVersions from '../../Hooks/useVersions';
import useAbout from '../../Hooks/useAbout';
import useWindow from '../../Hooks/useWindow';

// ━━ CONSTANTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const links = [
  { id: 1, to: '/', label: 'Home' },
  { id: 2, to: 'dashboard', label: 'Dashboard' },
  { id: 3, to: 'products', label: 'Products' },
  { id: 4, to: 'tasks', label: 'Tasks' },
  { id: 5, to: 'user', label: 'User' },
];

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
 * The `Navigation` component.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {boolean} props.openModal - Function to display a modal window.
 * @returns {JSX.Element} The `Navigation` components.
 */
const Navigation = ({ openModal }) => {
  const { controls } = useWindow();
  const signout = useSignout();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClick = () => {
    signout();
    navigate('/signin', { state: { from: pathname } });
  };
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        {links.map(element => (
          <li key={element.id} className="navigation__link">
            <NavLink to={element.to}>{element.label}</NavLink>
          </li>
        ))}
        <li className="navigation__link">
          <button type="button" className="btn btn--primary" onClick={openModal}>
            Open modal
          </button>
        </li>
        <li className="navigation__link">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => controls.openWindow('about')}
          >
            Open window
          </button>
        </li>
        <li className="navigation__link">
          <button type="button" className="btn btn--primary" onClick={() => onClick()}>
            Signout
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  openModal: PropTypes.func.isRequired,
};

/**
 * The `Header` component.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {boolean} props.onModal - If it is a normal or modal window.
 * @returns {JSX.Element} The `Header` components.
 */
const Header = ({ onModal }) => {
  const { isOpen, toggle, closeModal, Modal } = useModal();
  return (
    <header id="header-wrapper">
      <Versions />
      <Figure />
      <Titles />
      {!onModal && <Navigation openModal={toggle} />}
      <Modal
        id="popup"
        title="Modal"
        isOpen={isOpen}
        closeModal={closeModal}
        position={{ top: '50%', left: '50%' }}
      >
        <div>
          <h1>Hi</h1>
        </div>
      </Modal>
    </header>
  );
};

Header.propTypes = {
  onModal: PropTypes.bool.isRequired,
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Header;
