"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  const colorMap = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };
  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to QuickURL
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your one-stop tool to shorten URLs, monitor cache, and manage links
            seamlessly.
          </p>
          <Link href="/generate">
            <Button className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Generate New Short URL",
              desc: "Enter your long URL and get a smart short one instantly.",
              href: "/generate",
              color: "blue",
            },
            {
              title: "See Cached URLs",
              desc: "Inspect all currently cached URLs using LRU strategy.",
              href: "/see-cached",
              color: "green",
            },
            {
              title: "See All Database URLs",
              desc: "Browse all stored URLs from the MongoDB database.",
              href: "/see-database",
              color: "purple",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>{item.desc}</p>
                  <Link href={item.href} passHref>
                    <Button
                      className={`mt-4 ${colorMap[item.color]} text-white`}
                    >
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
