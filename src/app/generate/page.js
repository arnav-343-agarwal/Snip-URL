'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function Generate() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateShortUrl = async () => {
    setLoading(true);
    setError('');
    const startTime = performance.now();

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullUrl: longUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.message || 'Something went wrong!');
      }

      const endTime = performance.now();
      setTimeTaken((endTime - startTime).toFixed(2));
    } catch (error) {
      setError('Error generating short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Generate a Short URL</h2>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter long URL here"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleGenerateShortUrl}
              disabled={loading || !longUrl}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Generating...' : 'Generate Short URL'}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {shortUrl && (
              <div className="mt-6">
                <p className="font-semibold">Short URL:</p>
                <a href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/shorturl/${shortUrl}`} className="text-blue-500">
                  {`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/shorturl/${shortUrl}`}
                </a>
                <p className="mt-2">Time taken: {timeTaken} ms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
