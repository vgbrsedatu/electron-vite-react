/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Home` React component view.
 */
// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT COMPONENTS
import React from 'react';

// » IMPORT COMPONENTS
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Home` react component view.
 *
 * @component
 * @returns {JSX.Element} The `Home` components.
 */
const Home = () => (
  <main id="container">
    <Header />
    <Main />
    <Footer />
  </main>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Home;
