"use client"
import { useEffect, useState } from 'react';

export default function SeeCachedUrls() {
  const [cachedUrls, setCachedUrls] = useState([]);

  useEffect(() => {
    // Fetch the cached URLs from the API
    fetch('/api/shorturl/cached')
      .then((response) => response.json())
      .then((data) => {
        if (data.cachedUrls) {
          setCachedUrls(data.cachedUrls);
        } else {
          alert(data.message); // Display any error message
        }
      });
  }, []);

  return (
    <div>
      <h1>Cached URLs</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Short URL</th>
            <th className="px-4 py-2 border">Full URL</th>
          </tr>
        </thead>
        <tbody>
          {cachedUrls.map((url, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{url.shortUrl}</td>
              <td className="px-4 py-2 border">
                <a href={url.fullUrl} target="_blank" rel="noopener noreferrer">
                  {url.fullUrl}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
