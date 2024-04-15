import styles from './Navigation.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="container">
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? styles.active : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === '/add-bed' ? styles.active : ''}`} href="/add-bed">
            Add bed
          </Link>
        </li>
      </ul>
    </nav>
  );
}
