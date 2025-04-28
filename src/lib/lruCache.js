import redis from './redis'; // Assuming you already have your Redis connection setup

const CACHE_SIZE_LIMIT = 10;  // Limit the cache to 10 most recent URLs

// Add URL to the LRU cache
export const addToCache = async (shortUrl, fullUrl) => {
  // Store the full URL against the short URL in Redis
  await redis.set(shortUrl, fullUrl);

  // Add the shortUrl to the front of the LRU cache list (most recent access)
  await redis.lpush('lru:cache', shortUrl);

  // Trim the list to only keep the latest 'CACHE_SIZE_LIMIT' URLs
  await redis.ltrim('lru:cache', 0, CACHE_SIZE_LIMIT - 1);
};

// Get URL from the LRU cache
export const getFromCache = async (shortUrl) => {
  // Check if the URL is in the cache
  const fullUrl = await redis.get(shortUrl);

  if (fullUrl) {
    // Move the accessed URL to the front of the list (mark it as most recently used)
    await redis.lrem('lru:cache', 0, shortUrl);  // Remove it from its current position
    await redis.lpush('lru:cache', shortUrl);    // Add it to the front of the list

    return fullUrl;
  }

  return null;  // Return null if URL not found in the cache
};

// Check if URL is in cache, if not, add it
export const getOrAddToCache = async (shortUrl, fullUrl) => {
  // Try to get the URL from the cache
  const fullUrlFromCache = await getFromCache(shortUrl);

  if (fullUrlFromCache) {
    // Return the cached URL if it exists
    return fullUrlFromCache;
  }

  // If the URL was not found in the cache, add it to the cache and return the full URL
  await addToCache(shortUrl, fullUrl);

  return fullUrl;  // You can replace this with fetching from the DB if needed
};
