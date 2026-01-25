"use client";

import React from "react";
import { Search } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectFirstThingsToGoogleProps {
  searchTerms: string[];
  revealed: boolean;
}

export function ProjectFirstThingsToGoogle({
  searchTerms,
  revealed,
}: ProjectFirstThingsToGoogleProps) {
  if (!searchTerms || searchTerms.length === 0) return null;

  return (
    <ProjectSection
      icon={<Search className="w-4 h-4" />}
      title="First things to Google"
      delay={900}
      revealed={revealed}
    >
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {searchTerms.map((term, index) => (
          <span
            key={index}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-secondary border border-border text-sm sm:text-base text-foreground/90 font-medium"
          >
            {term}
          </span>
        ))}
      </div>
    </ProjectSection>
  );
}
