"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import { Lightbulb, RefreshCw, Code, Target, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroPreview() {
  const { project, next, loading } = useHeroProjects();

  return (
    <div className="w-full max-w-lg">
      {/* Floating decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative border border-border/50 rounded-2xl bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20">
        {/* Card header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Suggested Project
              </h3>
              <p className="text-xs text-muted-foreground">
                Tailored for your skills
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent/50" />
            <div className="w-3 h-3 rounded-full bg-muted" />
            <div className="w-3 h-3 rounded-full bg-muted" />
          </div>
        </div>

        {/* Card content */}
        <div className="p-6 space-y-5">
          <div
            className={cn(
              "space-y-3 transition-opacity duration-300",
              loading && "opacity-50"
            )}
          >
            <h4 className="text-xl sm:text-2xl font-bold text-foreground leading-tight text-balance">
              {project.title}
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/50">
              <Target className="w-3.5 h-3.5 text-accent" />
              <span className="text-sm font-medium text-foreground/90">
                {project.level}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/50">
              <Code className="w-3.5 h-3.5 text-accent" />
              <span className="text-sm font-medium text-foreground/90">
                {project.stack}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={next}
              disabled={loading}
              variant="outline"
              className="flex-1 border-border/50 hover:bg-secondary/50 bg-transparent"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Generate Another
                </>
              )}
            </Button>
            <Button size="icon" variant="outline" className="border-border/50 hover:bg-secondary/50 bg-transparent">
              <ArrowUpRight className="w-4 h-4" />
              <span className="sr-only">View project details</span>
            </Button>
          </div>
        </div>

        {/* Decorative gradient line at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </div>
  );
}
