
"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import { Lightbulb, RefreshCw, Code, Target } from "lucide-react";

export default function HeroPreview() {
  const { project, next, loading } = useHeroProjects();

  return (
    <div className="w-full max-w-lg">
      <div className="border border-neutral-200 rounded-2xl bg-white p-6 sm:p-8 shadow-[0_2px_8px_0_rgb(0,0,0,0.04),0_20px_60px_-10px_rgb(0,0,0,0.1)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-neutral-700" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Suggested Project</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
              {project.title}
            </h4>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200">
              <Target className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">{project.level}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200">
              <Code className="w-4 h-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">{project.stack}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={next}
          disabled={loading}
          className="rounded-lg bg-neutral-700 px-4 py-2 font-semibold text-white hover:bg-neutral-800  transition-colors"
          variant="outline"
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
      </div>
    </div>
  );
}
