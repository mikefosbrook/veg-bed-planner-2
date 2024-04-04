import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="container">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/add-bed">Add bed</Link>
        </li>
      </ul>
    </nav>
  );
}
