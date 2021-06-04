import Link from 'next/link';
import { ReactElement } from 'react';

export function Menu(): ReactElement {
  return (
    <div className="divide-x divide-gray-400 text-gray-500 text-sm">
      <Link href="/">
        <a className="px-2 hover:text-blue-600">check</a>
      </Link>
      <Link href="/report">
        <a className="px-2 hover:text-blue-600">report</a>
      </Link>
      <Link href="/docs">
        <a className="px-2 hover:text-blue-600">developers</a>
      </Link>
    </div>
  );
}
