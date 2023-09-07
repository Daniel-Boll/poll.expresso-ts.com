import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { WithChildren } from "@/lib/utils";
import { ExpressoTSLogo } from "./logo";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function ExpressoTSHoverCard({ children }: WithChildren) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <a href="https://expresso-ts.com" target="_blank">
          <div className="flex justify-between space-x-4">
            <ExpressoTSLogo />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@expressots</h4>
              <p className="text-sm font-normal">
                The Developer-Friendly TypeScript Framework for Server-Side
                Applications
              </p>
              <div className="flex items-center pt-2">
                <StarFilledIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  {/* TODO: Perhaps fetch this from GitHub API? */}
                  1.4k stars
                </span>
              </div>
            </div>
          </div>
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
