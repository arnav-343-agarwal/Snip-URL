import { getOrAddToCache } from "@/lib/lruCache";  // Import cache functions
import { Url } from "@/lib/models/Url";  // Import the URL model

export async function GET(req,{params}) {
  try {
    // Access the shortId directly from req.params
    const { shortId } = params;  // Destructure shortId from route params

    // Try to get the full URL from the cache first
    const fullUrlFromCache = await getOrAddToCache(shortId, null);

    if (!fullUrlFromCache) {
      // If it's not in the cache, check the database
      const urlFromDb = await Url.findOne({ shortUrl: shortId });

      if (!urlFromDb) {
        return new Response(JSON.stringify({ message: "Short URL not found!" }), { status: 404 });
      }

      // If found in the DB, add it to the cache
      await getOrAddToCache(shortId, urlFromDb.fullUrl);
      return new Response(JSON.stringify({ fullUrl: urlFromDb.fullUrl }), { status: 200 });
    }

    // If found in cache, return it
    return new Response(JSON.stringify({ fullUrl: fullUrlFromCache }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}
