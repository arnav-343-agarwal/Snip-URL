"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function SeeCachedUrls() {
  const [cachedUrls, setCachedUrls] = useState([]);

  useEffect(() => {
    fetch('/api/shorturl/cached')
      .then((response) => response.json())
      .then((data) => {
        if (data.cachedUrls) {
          setCachedUrls(data.cachedUrls);
        } else {
          alert(data.message);
        }
      });
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Cached URLs</h1>
        <p className="text-gray-600 mb-4">Here are the most recently cached short URLs:</p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Full URL</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Short URL</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-700">
              {cachedUrls.length === 0 ? (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                    No cached URLs found
                  </td>
                </tr>
              ) : (
                cachedUrls.map((url, index) => {
                  const fullShortUrl = `${window.location.origin}/api/shorturl/${url.shortUrl}`;
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 break-all">
                        <a href={url.fullUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                          {url.fullUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <a href={fullShortUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                          {fullShortUrl}
                        </a>
                        <button
                          onClick={() => copyToClipboard(fullShortUrl)}
                          className="ml-2 text-sm px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
