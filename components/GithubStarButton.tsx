"use client";

import React, { useEffect, useState } from "react";
import { Github, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REPO = "imSaikirann/ideacoach";

export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(0))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Star our GitHub repository"
      className="group w-full sm:w-auto"
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "relative overflow-hidden w-full sm:w-auto border border-border/60 bg-gradient-to-r from-background to-secondary/30",
          "transition-all duration-300",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20",
          isHovered && "border-accent/50 shadow-lg shadow-accent/20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background glow on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0",
            "translate-x-full transition-transform duration-500 group-hover:translate-x-0"
          )}
        />

        {/* Content */}
        <div className="relative flex items-center justify-center sm:justify-start gap-2">
          <Github
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-all duration-300",
              isHovered && "scale-110 text-accent"
            )}
          />

          <span className={cn(
            "font-medium hidden sm:inline transition-colors duration-300",
            isHovered && "text-accent"
          )}>Star</span>

          {isLoading ? (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-xs font-semibold text-accent">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="hidden sm:inline">Loading...</span>
            </span>
          ) : stars !== null && stars > 0 ? (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-xs font-semibold text-accent">
              <Star className="h-3 w-3 fill-accent text-accent flex-shrink-0" />
              <span>{stars.toLocaleString()}</span>
            </span>
          ) : null}
        </div>
      </Button>
    </a>
  );
}
