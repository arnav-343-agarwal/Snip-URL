"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function SeeCachedUrls() {
  const [cachedUrls, setCachedUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/shorturl/cached")
      .then((response) => response.json())
      .then((data) => {
        if (data.cachedUrls) {
          setCachedUrls(data.cachedUrls);
        } else {
          alert(data.message);
        }
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-extrabold text-gray-800"
            >
              Cached URLs
            </motion.h1>
            <p className="text-gray-600 mt-2 text-lg">
              Recently cached short URLs stored in Redis
            </p>
          </div>

          {/* Redis Image Section */}
          <motion.div
            className="bg-white border rounded-xl shadow-lg p-4 flex items-center gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="redish-cache.webp"
              alt="Redis Cache"
              className="w-24 h-24 object-contain"
            />
            <div>
              <p className="text-sm text-gray-500">Caching Engine</p>
              <p className="font-semibold text-red-600">Powered by Redis</p>
            </div>
          </motion.div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-16 bg-gray-200 rounded-xl animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          ) : cachedUrls.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No cached URLs found</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Full URL
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Short URL
                  </th>
                </tr>
              </thead>
              <tbody>
                {cachedUrls.map((url, index) => {
                  const fullShortUrl = `${window.location.origin}/api/shorturl/${url.shortUrl}`;
                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 break-all">
                        <a
                          href={url.fullUrl}
                          className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.fullUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <a
                            href={fullShortUrl}
                            className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {fullShortUrl}
                          </a>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(fullShortUrl)}
                            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-medium transition"
                          >
                            Copy
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
