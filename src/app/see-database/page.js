'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function SeeDatabase() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});

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

  const toggleReadMore = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncate = (text, length = 60) =>
    text.length > length ? text.slice(0, length) + '...' : text;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Stored Database URLs
        </motion.h2>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {[...Array(3)].map((_, idx) => (
              <Card key={idx}>
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : urls.length === 0 ? (
          <p className="text-center text-gray-600">No URLs found in the database.</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {urls.map((url) => {
              const short = `${window.location.origin}/api/shorturl/${url.shortUrl}`;
              return (
                <motion.div
                  key={url._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4 space-y-2">
                      <div className="text-blue-600 break-words">
                        <a
                          href={short}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {short}
                        </a>
                      </div>
                      <div className="text-gray-700 break-words">
                        {expandedRows[url._id] ? url.fullUrl : truncate(url.fullUrl)}
                        {url.fullUrl.length > 60 && (
                          <Button
                            variant="link"
                            className="ml-2 text-blue-500 p-0 h-auto"
                            onClick={() => toggleReadMore(url._id)}
                          >
                            {expandedRows[url._id] ? 'Show less' : 'Read full'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
