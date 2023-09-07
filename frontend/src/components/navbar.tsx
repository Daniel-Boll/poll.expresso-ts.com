import Link from "next/link";
import { ExpressoTSHoverCard } from "./expressots-hover";
import { ExpressoTSLogo } from "./logo";
import { ModeToggle } from "./theme/toggle";

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-40">
      <nav className="flex items-center justify-between p-5">
        <div className="group flex flex-row gap-2 items-center text-xl font-bold hover:cursor-pointer">
          <Link href="/" className="flex flex-row items-center ">
            <ExpressoTSLogo />
            Poll
          </Link>
          <ExpressoTSHoverCard>
            <a
              className="bg-gradient-to-br from-[#19CE59] to-[#116A32] text-transparent bg-clip-text hover:scale-110 transform transition-all duration-300 ease-in-out"
              href="https://expresso-ts.com"
              target="_blank"
            >
              @ExpressoTS
            </a>
          </ExpressoTSHoverCard>
        </div>
        <div className="space-x-4">
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
