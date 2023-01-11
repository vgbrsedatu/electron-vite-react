/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Router` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

// » IMPORT APP COMPONENT
import Protected from './Protected';
import About from '../Views/About';
import Dashboard from '../Views/Dashboard';
import Products from '../Views/Products';
import Tasks from '../Views/Tasks';
import User from '../Views/User';
import Home from '../Views/Home';
import Signin from '../Views/Signin';

const HomeProtected = () => (
  <Protected>
    <Home />
  </Protected>
);

const DashboardProtected = () => (
  <Protected>
    <Dashboard />
  </Protected>
);

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Router` component, is in charge of routing the application.
 *
 * @component
 * @returns {JSX.Element} The `Router` components.
 */
const Router = () => (
  <Fragment key="router">
    <Routes>
      <Route path="/" element={<HomeProtected />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<DashboardProtected />} />
      <Route path="products" element={<Products />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="user" element={<User />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  </Fragment>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Router;
