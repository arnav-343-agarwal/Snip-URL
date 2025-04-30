import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Generate New Short URL */}
            <Card className="transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Generate New Short URL
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Enter your long URL to get a short URL in return.</p>
                <Link href="/generate" passHref>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                    Go to Generator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* See Cached URLs */}
            <Card className="transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  See Cached URLs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>View all the URLs cached in the system.</p>
                <Link href="/see-cached" passHref>
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Go to Cache
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* See All Database URLs */}
            <Card className="transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  See All Database URLs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Browse all the URLs stored in the MongoDB database.</p>
                <Link href="/see-database" passHref>
                  <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">
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
