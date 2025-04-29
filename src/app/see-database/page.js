'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function SeeDatabase() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch('/api/dburls');
        const data = await res.json();
        setUrls(data.urls);
      } catch (err) {
        console.error('Error fetching database URLs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">All Database URLs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : urls.length === 0 ? (
            <p>No URLs found in the database.</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Short URL</th>
                    <th className="p-3 text-left">Full URL</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url) => (
                    <tr key={url._id} className="border-t">
                      <td className="p-3 text-blue-600">
                        <a
                          href={`/api/shorturl/${url.shortUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.shortUrl}
                        </a>
                      </td>
                      <td className="p-3 break-words">{url.fullUrl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
