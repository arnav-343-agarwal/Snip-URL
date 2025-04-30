import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-12">
        {/* Introductory Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to QuickURL</h1>
          <p className="text-lg text-gray-700">
            A fast and reliable URL shortening service that allows you to generate, store, and view URLs seamlessly. Start shortening your links now!
          </p>
        </div>

        {/* Cards Section */}
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Generate New Short URL */}
            <Card className="transition-shadow hover:shadow-2xl hover:scale-105 transform duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Generate New Short URL
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Enter your long URL to get a short, shareable URL in return.</p>
                <Link href="/generate" passHref>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all">
                    Go to Generator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* See Cached URLs */}
            <Card className="transition-shadow hover:shadow-2xl hover:scale-105 transform duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  See Cached URLs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>View all the URLs cached in the system, for quick access and management.</p>
                <Link href="/see-cached" passHref>
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all">
                    Go to Cache
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* See All Database URLs */}
            <Card className="transition-shadow hover:shadow-2xl hover:scale-105 transform duration-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  See All Database URLs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Browse all the URLs stored in the MongoDB database, easily manage your links.</p>
                <Link href="/see-database" passHref>
                  <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg transition-all">
                    View Database
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
