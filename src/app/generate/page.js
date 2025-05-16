'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../../components/Navbar';

export default function Generate() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const [source, setSource] = useState('');
  const [timeTaken, setTimeTaken] = useState('');

  const handleGenerateShortUrl = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    setShortUrl('');
    setSource('');
    setTimeTaken('');

    const start = Date.now();
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullUrl: longUrl }),
      });

      const end = Date.now();
      const data = await response.json();

      if (response.ok) {
        setShortUrl(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/shorturl/${data.shortUrl}`);
        setInfo(data.message || 'Short URL generated successfully!');
        setSource(data.fromCache ? 'Cache' : 'Database');
        setTimeTaken(`${end - start} ms`);
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-800">URL Shortener</h1>
          <p className="text-gray-600 text-sm">
            Paste a long URL to generate a clean, shareable short link.
            You will also see performance details like generation time and source (cache/database).
          </p>
        </motion.div>

        {/* Input and result card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <Card className="p-6 shadow-xl">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4 text-center">Generate a Short URL</h2>
              <Input
                type="text"
                placeholder="Enter your long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={handleGenerateShortUrl}
                disabled={loading || !longUrl}
                className="w-full mb-4"
              >
                {loading ? 'Generating...' : 'Generate'}
              </Button>
              {info && <p className="text-green-600 text-center text-sm mb-2">{info}</p>}
              {error && <p className="text-red-600 text-center text-sm mb-2">{error}</p>}
              {shortUrl && (
                <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline truncate max-w-[80%]"
                  >
                    {shortUrl}
                  </a>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    Copy
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Taken and Source Cards */}
        {(timeTaken || source) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-xl mx-auto">
            {timeTaken && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-4 text-center shadow-md bg-white">
                  <p className="text-sm text-gray-500">Time Taken</p>
                  <p className="text-lg font-semibold text-indigo-700">🕒 {timeTaken}</p>
                </Card>
              </motion.div>
            )}
            {source && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-4 text-center shadow-md bg-white">
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="text-lg font-semibold text-purple-700">
                    {source === 'Cache' ? '⚡ Cache' : '💾 Database'}
                  </p>
                </Card>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
