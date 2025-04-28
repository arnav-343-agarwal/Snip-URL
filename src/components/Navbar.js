import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuickURL</h1>
        <div className="flex space-x-6">
          <Link href="https://redis.io" className="hover:underline">
            Redis Site
          </Link>
          <Link href="https://upstash.com" className="hover:underline">
            Upstash Redis
          </Link>
          <Link href="https://shadcn.dev" className="hover:underline">
            Shadcn Docs
          </Link>
        </div>
      </div>
    </nav>
  );
}
