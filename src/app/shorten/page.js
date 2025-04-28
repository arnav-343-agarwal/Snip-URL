"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function ShortenPage() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!fullUrl) return;

    setLoading(true);
    setShortUrl("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(`${window.location.origin}/api/shorturl/${data.shortUrl}`);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Error shortening URL.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl text-white font-bold text-center">
            URL Shortener
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input
            placeholder="Enter your long URL here..."
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="bg-white/20 text-white placeholder-white/70"
          />
          <Button onClick={handleShorten} disabled={loading} className="w-full">
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>

          {shortUrl && (
            <div className="flex items-center justify-between bg-white/20 p-3 rounded-lg">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline break-all"
              >
                {shortUrl}
              </a>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 text-white" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
