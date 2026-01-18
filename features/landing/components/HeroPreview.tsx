"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import {
  Lightbulb,
  RefreshCw,
  Code,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroPreview() {
  const { project, next, loading } = useHeroProjects();

  return (
    <div className="relative w-full max-w-lg">
      {/* Subtle ambient glow (reduced noise) */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Suggested project
              </h3>
              <p className="text-xs text-muted-foreground">
                Generated for your profile
              </p>
            </div>
          </div>

          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Title + description */}
          <div
            className={cn(
              "space-y-3 transition-opacity duration-300",
              loading && "opacity-60"
            )}
          >
            <h4 className="text-xl sm:text-2xl font-semibold leading-tight text-balance">
              {project.title}
            </h4>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/60 px-3 py-1.5">
              <Target className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-medium">
                {project.level}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/60 px-3 py-1.5">
              <Code className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-medium">
                {project.stack}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={next}
              disabled={loading}
              variant="outline"
              className="flex-1 border-border/60 bg-transparent hover:bg-secondary/60"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Thinking…
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try another idea
                </>
              )}
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-border/60 bg-transparent hover:bg-secondary/60"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>

        {/* Bottom focus line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </div>
  );
}
