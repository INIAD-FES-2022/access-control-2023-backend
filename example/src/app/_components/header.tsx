import { GitHubIcon } from "@/components/icons/github";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        Access Control Example
        <Link
          href="https://github.com/INIAD-FES-2022/access-control-2023-backend/tree/main/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0",
            )}
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
