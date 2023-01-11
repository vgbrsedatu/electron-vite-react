/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Navigation` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { NavLink, useLocation } from 'react-router-dom';
import useWindow from '../../Hooks/useWindow';

const links = [
  { id: 1, to: '/', label: 'Home' },
  { id: 2, to: 'dashboard', label: 'Dashboard' },
  { id: 3, to: 'products', label: 'Products' },
  { id: 4, to: 'tasks', label: 'Tasks' },
  { id: 5, to: 'user', label: 'User' },
];

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Navigation` component.
 *
 * @component
 * @returns {JSX.Element} The `Navigation` components.
 */
const Navigation = () => {
  const { openWindow } = useWindow();
  const { pathname } = useLocation();
  const modals = ['about'];
  const onModal = modals.includes(pathname.slice(1));
  if (onModal) {
    return null;
  }
  return (
    <nav>
      <ul className="navigation">
        {links.map(element => (
          <li key={element.id}>
            <NavLink to={element.to}>{element.label}</NavLink>
          </li>
        ))}
        <li>
          <button type="button" className="btn btn--primary" onClick={() => openWindow('about')}>
            Open window
          </button>
        </li>
      </ul>
    </nav>
  );
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Navigation;
