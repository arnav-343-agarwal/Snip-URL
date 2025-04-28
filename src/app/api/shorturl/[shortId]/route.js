import { getOrAddToCache } from "@/lib/lruCache";
import { Url } from "@/lib/models/Url";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req, context) {
  try {
    const { params } = await context;
    const { shortId } = params;

    await dbConnect();

    let fullUrl = await getOrAddToCache(shortId, null);

    if (!fullUrl) {
      const urlFromDb = await Url.findOne({ shortUrl: shortId });

      if (!urlFromDb) {
        return new Response("Short URL not found!", { status: 404 });
      }

      fullUrl = urlFromDb.fullUrl;
      await getOrAddToCache(shortId, fullUrl);
    }

    return Response.redirect(fullUrl, 302);

  } catch (error) {
    console.error(error);
    return new Response("Something went wrong!", { status: 500 });
  }
}
