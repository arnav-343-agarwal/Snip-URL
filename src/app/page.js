import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Generate New Short URL */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold mb-4">Generate New Short URL</h2>
              <p>Enter your long URL to get a short URL in return.</p>
              <Link
                href="/generate"
                className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              >
                Go to Generator
              </Link>
            </div>

            {/* See Cached URLs */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold mb-4">See Cached URLs</h2>
              <p>View all the URLs cached in the system.</p>
              <Link
                href="/see-cached"
                className="mt-4 inline-block text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
              >
                Go to Cache
              </Link>
            </div>

            {/* See All Database URLs */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <h2 className="text-xl font-semibold mb-4">See All Database URLs</h2>
              <p>Browse all the URLs stored in the MongoDB database.</p>
              <Link
                href="/see-database"
                className="mt-4 inline-block text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
              >
                View Database
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
