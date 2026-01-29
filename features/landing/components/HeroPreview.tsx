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
    <div className="relative w-full max-w-lg">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-accent" />
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-tight">
                AI-Generated Project
              </h3>
              <p className="text-xs text-muted-foreground">
                Built to stretch your skills
              </p>
            </div>
          </div>

          <Sparkles className="h-4 w-4 text-accent/70" />
        </div>

        {/* Content */}
        <div className="space-y-6 px-6 py-6">
          <div
            className={cn(
              "space-y-4 transition-all duration-500 ease-out",
              isAnimating
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            {/* Title */}
            <h4 className="text-balance text-xl font-semibold sm:text-2xl">
              {project.title}
            </h4>

            {/* One-liner */}
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.oneLiner}
            </p>

            {/* Problem */}
            <div className="rounded-xl border border-border/60 bg-secondary/50 p-4">
              <p className="text-sm">
                <span className="font-medium text-foreground">
                  Problem it solves:
                </span>{" "}
                <span className="text-muted-foreground">
                  {project.problemSolved}
                </span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Must-have features</p>
              <ul className="space-y-1.5">
                {project.mustHaveFeatures.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why it fits you */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.whyItFitsYou.slice(0, 2).map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5"
                >
                  <Target className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={next}
              disabled={isAnimating}
              className="relative flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
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

            <Button size="icon" variant="outline">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom beam */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </div>
  );
}
