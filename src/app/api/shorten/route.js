import { Url } from "@/lib/models/Url";
import { dbConnect } from "@/lib/dbConnect";
import { nanoid } from "nanoid";
import { getOrAddToCache } from "@/lib/lruCache";

export async function POST(req) {
  try {
    const start = Date.now();
    const { fullUrl } = await req.json();

    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(fullUrl)) {
      return new Response(JSON.stringify({ message: "Invalid URL format." }), { status: 400 });
    }

    await dbConnect();

    const existingUrl = await Url.findOne({ fullUrl });
    if (existingUrl) {
      const cached = await getOrAddToCache(existingUrl.shortUrl, null); // Check cache only

      if (!cached) {
        await getOrAddToCache(existingUrl.shortUrl, fullUrl); // Cache it now
      }

      return new Response(
        JSON.stringify({
          message: "URL already shortened.",
          shortUrl: existingUrl.shortUrl,
          fromCache: !!cached,
          newlyCreated: false,
          timeTaken: `${Date.now() - start}ms`
        }),
        { status: 200 }
      );
    }

    const shortUrl = nanoid(10);
    const newUrl = new Url({ fullUrl, shortUrl });

    await newUrl.save();
    await getOrAddToCache(shortUrl, fullUrl);

    return new Response(
      JSON.stringify({
        message: "New short URL created.",
        shortUrl,
        fromCache: false,
        timeTaken: `${Date.now() - start}ms`,
        newlyCreated: true,
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}
