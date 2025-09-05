'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="text-center mt-2">
      <h1>404 – Page Not Found</h1>
      <p>Oops, looks like this page doesn't exist.</p>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
}
