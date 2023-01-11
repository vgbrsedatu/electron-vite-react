/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Layout` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import React from 'react';

// » IMPORT COMPONENTS
import TitleBar from './TitleBar';
import Router from '../../Routes/Router';
import Footer from './Footer';
import Header from './Header';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Layout` component.
 *
 * @component
 * @returns {JSX.Element} The `Layout` components.
 */
const Layout = () => (
  <React.Fragment key="Layout">
    <TitleBar />
    <Header />
    <main id="container">
      <Router />
    </main>
    <Footer />
  </React.Fragment>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Layout;
