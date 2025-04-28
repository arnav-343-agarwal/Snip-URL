import { urlModel } from "../../../models/urlModel"; // Import your model
import { nanoid } from "nanoid"; // Import nanoid to generate short URL
import { cookies } from "next/headers"; // To access cookies for JWT validation
import { jwtVerify } from "jose"; // To verify JWT (you can also use jsonwebtoken)

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const token = cookies().get("token"); // Get token from cookies

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized, please login first." }), { status: 401 });
  }

  try {
    // Verify JWT
    const verified = await jwtVerify(token, JWT_SECRET);

    if (!verified) {
      return new Response(JSON.stringify({ message: "Invalid token!" }), { status: 401 });
    }

    // Proceed to shorten the URL
    const { fullUrl } = await req.json();

    // Validate the URL format
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(fullUrl)) {
      return new Response(JSON.stringify({ message: "Invalid URL format." }), { status: 400 });
    }

    // Check if this URL is already shortened
    const existingUrl = await urlModel.findOne({ fullUrl });
    if (existingUrl) {
      return new Response(JSON.stringify({ message: "URL already shortened.", shortUrl: existingUrl.shortUrl }), { status: 200 });
    }

    // Create a new short URL
    const shortUrl = nanoid(10); // You can change the length if needed

    // Save the shortened URL to the database
    const newUrl = new urlModel({
      fullUrl,
      shortUrl,
    });

    await newUrl.save();
    await addToCache(shortUrl, fullUrl);

    // Send back the response with the shortened URL
    return new Response(JSON.stringify({ fullUrl, shortUrl: newUrl.shortUrl }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}
