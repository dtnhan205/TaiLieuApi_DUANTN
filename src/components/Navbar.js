import { Link, useLocation } from 'react-router-dom';
import styles from './css/Navbar.module.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/apis" className={`${styles.navLink} ${location.pathname === '/apis' ? styles.active : ''}`}>
            API
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;