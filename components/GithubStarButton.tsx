"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const REPO = "imSaikirann/ideacoach";

export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`);
        const data = await res.json();
        setStars(data?.stargazers_count ?? null);
      } catch {
        setStars(null);
      }
    }

    fetchStars();
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />

              <span className="hidden sm:inline">Star</span>

              {stars !== null && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-current" />
                  {stars}
                </span>
              )}
            </Button>
          </a>
        </TooltipTrigger>

        <TooltipContent>
          Star IdeaCoach on GitHub
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}