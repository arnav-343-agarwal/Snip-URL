"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-sm bg-[#0e0e10]/90 text-white shadow-lg border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          <Link href="/" className="hover:underline">
            ZipURL
          </Link>
        </h1>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            {[
              { label: "Redis Site", url: "https://redis.io" },
              { label: "Upstash Redis", url: "https://upstash.com" },
              { label: "Shadcn Docs", url: "https://shadcn.dev" },
            ].map(({ label, url }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white flex items-center gap-1"
                    asChild
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {label} <ExternalLink size={14} />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
}
