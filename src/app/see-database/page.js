"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import { ExternalLink } from "lucide-react";

export default function SeeDatabase() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch("/api/dburls");
        const data = await res.json();
        setUrls(data.urls);
      } catch (err) {
        console.error("Error fetching database URLs:", err);
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

  const truncate = (text, length = 80) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 text-gray-800"
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
          <div className="max-w-4xl mx-auto grid gap-6">
            {urls.map((url, index) => {
              const shortUrl = `${window.location.origin}/api/shorturl/${url.shortUrl}`;
              const isExpanded = expandedRows[url._id];

              return (
                <motion.div
                  key={url._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border border-gray-200 shadow-md hover:shadow-lg transition duration-200 rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-indigo-600 text-base font-medium">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          {shortUrl}
                          <ExternalLink size={16} />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm break-words leading-relaxed">
                        {isExpanded ? url.fullUrl : truncate(url.fullUrl)}
                        {url.fullUrl.length > 80 && (
                          <Button
                            variant="link"
                            size="sm"
                            className="ml-2 text-blue-500 p-0 h-auto text-xs"
                            onClick={() => toggleReadMore(url._id)}
                          >
                            {isExpanded ? "Show less" : "Read full"}
                          </Button>
                        )}
                      </p>
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
