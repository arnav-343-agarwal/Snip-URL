import { getFromCache, addToCache } from '@/lib/lruCache';
import { connectToDB } from '@/lib/mongodb'; 
import UrlModel from '@/models/url';

export async function GET(request, { params }) {
  const { shortId } = params;

  try {
    // 1. Try to get full URL from Redis LRU cache
    const cachedFullUrl = await getFromCache(shortId);

    if (cachedFullUrl) {
      return Response.redirect(cachedFullUrl, 302);
    }

    // 2. If not found in cache, query MongoDB
    await connectToDB();
    const urlEntry = await UrlModel.findOne({ shortId });

    if (!urlEntry) {
      return new Response(JSON.stringify({ error: 'Short URL not found' }), { status: 404 });
    }

    // 3. Save it in Redis LRU cache for next time
    await addToCache(shortId, urlEntry.fullUrl);

    // 4. Redirect to full URL
    return Response.redirect(urlEntry.fullUrl, 302);

  } catch (error) {
    console.error('Error in short URL GET:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
