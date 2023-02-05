/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Layout` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';

// » IMPORT COMPONENTS
import TitleBar from './TitleBar';
import Footer from './Footer';
import Header from './Header';

// » IMPORT CUSTOM HOOKS
import Main from './Main';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Signin` component.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {string} props.title - The title of current window.
 * @param {boolean} props.onModal - If it is a normal or modal window.
 * @returns {JSX.Element} The `Layout` components.
 */
const Signin = ({ title }) => (
  <React.Fragment key="Layout">
    <TitleBar title={title} buttons="001" />
    <Main />
  </React.Fragment>
);

Signin.propTypes = {
  title: PropTypes.string.isRequired,
};

/**
 * The `Layout` component.
 *
 * @component
 * @returns {JSX.Element} The `Layout` components.
 */
const Layout = () => {
  const { pathname } = useLocation();
  const path = pathname.slice(1);
  const modals = ['about'];
  const titles = {
    about: 'About',
    dashboard: 'Dashboard',
    products: 'Products',
    tasks: 'Tasks',
    user: 'User',
  };

  const title = titles[path] || 'Electron app';
  const onModal = modals.includes(path);
  const onSignin = path === 'signin';

  if (onSignin) {
    return <Signin title={title} />;
  }

  return (
    <React.Fragment key="Layout">
      <TitleBar title={title} buttons={onModal ? '001' : '111'} />
      <Header onModal={onModal} />
      <Main />
      <Footer />
    </React.Fragment>
  );
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Layout;
