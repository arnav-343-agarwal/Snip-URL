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

  const handleGenerateShortUrl = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    setShortUrl('');

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullUrl: longUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setInfo(data.message || 'Short URL generated successfully!');
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-6 shadow-xl">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4 text-center">Generate a Short URL</h2>
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
              {info && <p className="text-green-600">{info}</p>}
              {error && <p className="text-red-600">{error}</p>}
              {shortUrl && (
                <div className="mt-4">
                  <p className="text-gray-700">Short URL:</p>
                  <a
                    href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/shorturl/${shortUrl}`}
                    className="text-blue-500 underline"
                  >
                    {`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/shorturl/${shortUrl}`}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
