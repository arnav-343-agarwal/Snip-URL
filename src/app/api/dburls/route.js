import { dbConnect } from '@/lib/dbConnect';
import { Url } from '@/lib/models/Url';

export async function GET() {
  try {
    await dbConnect();
    const urls = await Url.find({}, { _id: 1, shortUrl: 1, fullUrl: 1 }).lean();

    return new Response(JSON.stringify({ urls }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to fetch URLs' }), {
      status: 500,
    });
  }
}
