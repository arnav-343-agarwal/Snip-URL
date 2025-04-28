import { getAllCachedUrls } from "@/lib/lruCache"; // Import the function to get all cached URLs

export async function GET() {
  try {
    const cachedUrls = await getAllCachedUrls();

    if (cachedUrls.length === 0) {
      return new Response(JSON.stringify({ message: 'No cached URLs found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ cachedUrls }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 });
  }
}
