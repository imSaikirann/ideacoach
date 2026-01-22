"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import {
  Lightbulb,
  RefreshCw,
  Code,
  Target,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroPreview() {
  const { project, next, loading } = useHeroProjects();

  return (
    <div className="relative w-full max-w-lg">
      {/* Ambient AI glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Animated top glow */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-tight">
                AI Suggested Project
              </h3>
              <p className="text-xs text-muted-foreground">
                Personalized to your skill level
              </p>
            </div>
          </div>

          <Sparkles className="h-4 w-4 text-accent/70" />
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Title + description */}
          <div
            className={cn(
              "space-y-3 transition-all duration-300",
              loading && "opacity-60 translate-y-1"
            )}
          >
            <h4 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-balance">
              {project.title}
            </h4>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            <div className="group flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5">
              <Target className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition" />
              <span className="text-sm font-medium">
                {project.level}
              </span>
            </div>

            <div className="group flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5">
              <Code className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition" />
              <span className="text-sm font-medium">
                {project.stack}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3">
            <Button
              onClick={next}
              disabled={loading}
              className="
                relative flex-1 overflow-hidden
                bg-accent text-accent-foreground
                hover:bg-accent/90
              "
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Thinking…
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate another idea
                  </>
                )}
              </span>

              {/* Button glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="border-border/60 hover:bg-secondary/60"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>

        {/* Bottom focus beam */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </div>
  );
}
