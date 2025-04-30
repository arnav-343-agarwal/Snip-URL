import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuickURL</h1>
        <div className="flex space-x-6">
          <Tooltip content="Redis Official Site" side="bottom">
            <Button
              as="a"
              href="https://redis.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Redis Site
            </Button>
          </Tooltip>
          <Tooltip content="Upstash Redis" side="bottom">
            <Button
              as="a"
              href="https://upstash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Upstash Redis
            </Button>
          </Tooltip>
          <Tooltip content="Shadcn Documentation" side="bottom">
            <Button
              as="a"
              href="https://shadcn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Shadcn Docs
            </Button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
