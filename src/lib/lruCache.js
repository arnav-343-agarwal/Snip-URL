import { redis } from './redis';

const CACHE_SIZE_LIMIT = 10;  // Limit the cache to 10 most recent URLs

export const addToCache = async (shortUrl, fullUrl) => {
  // Store the full URL against the short URL in Redis
  await redis.set(shortUrl, fullUrl);

  // Add the shortUrl to the front of the LRU cache list (most recent access)
  await redis.lpush('lru:cache', shortUrl);

  // Trim the list to only keep the latest 'CACHE_SIZE_LIMIT' URLs
  await redis.ltrim('lru:cache', 0, CACHE_SIZE_LIMIT - 1);
};

export const getFromCache = async (shortUrl) => {
  // Check if the URL is in the cache
  const fullUrl = await redis.get(shortUrl);

  if (fullUrl) {
    // Move the accessed URL to the front of the list (mark it as most recently used)
    await redis.lrem('lru:cache', 0, shortUrl);  
    await redis.lpush('lru:cache', shortUrl);    

    return fullUrl;
  }

  return null;  // Return null if URL not found in the cache
};

export const getOrAddToCache = async (shortUrl, fullUrl) => {
  // Try to get the URL from the cache
  const fullUrlFromCache = await getFromCache(shortUrl);

  if (fullUrlFromCache) {
    return fullUrlFromCache;  // Return the cached URL if it exists
  }

  // If the URL was not found in the cache, add it to the cache
  if (fullUrl) {
    await addToCache(shortUrl, fullUrl);
  }

  return fullUrl;
};
