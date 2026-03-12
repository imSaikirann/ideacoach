"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import {
  Lightbulb,
  RefreshCw,
  Target,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroPreview() {
  const { project, next, isAnimating } = useHeroProjects();

  return (
    <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-lg shadow-2xl ring-1 ring-white/5">

        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/20">
              <Lightbulb className="h-4 w-4 text-accent" />
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-accent" />
            </div>

            <div className="leading-tight">
              <h3 className="text-sm font-semibold tracking-tight">
                AI Project Idea
              </h3>
              <p className="text-xs text-muted-foreground">
                tailored for your growth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-2.5 py-1">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Live</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <div
            className={cn(
              "space-y-4 transition-all duration-500 ease-out",
              isAnimating
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            {/* Title */}
            <h4 className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              {project.title}
            </h4>

            {/* One liner */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.oneLiner}
            </p>

            {/* Problem */}
            <div className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3.5">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-foreground">
                  Problem it solves:
                </span>{" "}
                <span className="text-muted-foreground">
                  {project.problemSolved}
                </span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Must-have features
              </p>

              <ul className="space-y-2">
                {project.mustHaveFeatures.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-[2px] h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why it fits */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.whyItFitsYou.slice(0, 2).map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-3 py-1.5 transition-colors hover:bg-secondary"
                >
                  <Target className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-border/40 pt-4">
            <Button
              onClick={next}
              disabled={isAnimating}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              {isAnimating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate another
                </>
              )}
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="shrink-0 hover:bg-secondary"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* bottom accent beam */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </div>
  );
}