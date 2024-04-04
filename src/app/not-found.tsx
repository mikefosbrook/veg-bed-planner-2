import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Sorry</h1>
      <p>That page cannot be found</p>
      <Link href="/">Back to the homepage...</Link>
    </div>
  );
}
