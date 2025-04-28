import { Url } from "@/lib/models/Url";
import { dbConnect } from "@/lib/dbConnect";
import { nanoid } from "nanoid";
import { getOrAddToCache } from "@/lib/lruCache";  // Import the cache functions

export async function POST(req) {
  try {
    const { fullUrl } = await req.json();

    // Validate the URL format
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(fullUrl)) {
      return new Response(JSON.stringify({ message: "Invalid URL format." }), { status: 400 });
    }

    // Check if this URL already exists in the database
    await dbConnect();
    const existingUrl = await Url.findOne({ fullUrl });
    if (existingUrl) {
      // If it's already in the database, inform the user and return the short URL
      await getOrAddToCache(existingUrl.shortUrl, fullUrl);  // Update cache with most recent
      return new Response(JSON.stringify({ message: "URL already shortened.", shortUrl: existingUrl.shortUrl }), { status: 200 });
    }

    // Generate a new short URL if it's not found in the database
    const shortUrl = nanoid(10);  // Generate a new short URL

    // Save the shortened URL to the database
    const newUrl = new Url({
      fullUrl,
      shortUrl,
    });

    await newUrl.save();  // Save to DB

    // Add the shortened URL to the cache
    await getOrAddToCache(shortUrl, fullUrl);

    // Send back the response with the shortened URL
    return new Response(JSON.stringify({ fullUrl, shortUrl: newUrl.shortUrl }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}
