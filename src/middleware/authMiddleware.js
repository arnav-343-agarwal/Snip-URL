import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const token = req.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    // Protected API routes
    "/api/shorten",        // Create shortened URL
    "/api/urls",           // Get list of shortened URLs
    "/api/urls/:path*",    // Delete URL by ID
  ],
};
