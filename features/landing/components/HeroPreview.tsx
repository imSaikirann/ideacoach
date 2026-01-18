
"use client";

import { Button } from "@/components/ui/button";
import { useHeroProjects } from "../hooks/useHeroProjects";
import { Lightbulb, RefreshCw, Code, Target } from "lucide-react";

export default function HeroPreview() {
  const { project, next, loading } = useHeroProjects();

  return (
    <div className="w-full max-w-lg">
      <div className="border border-[#2A1F1F] rounded-2xl bg-[#1A1818] p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#2A1F1F] flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#A0A0A0]" />
          </div>
          <h3 className="text-lg font-semibold text-[#E5E5E5]">Suggested Project</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#E5E5E5] leading-tight">
              {project.title}
            </h4>
            <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2A1F1F] border border-[#541212]">
              <Target className="w-4 h-4 text-[#A0A0A0]" />
              <span className="text-sm font-medium text-[#E5E5E5]">{project.level}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2A1F1F] border border-[#541212]">
              <Code className="w-4 h-4 text-[#A0A0A0]" />
              <span className="text-sm font-medium text-[#E5E5E5]">{project.stack}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={next}
          disabled={loading}
          className="mt-6 w-full"
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
