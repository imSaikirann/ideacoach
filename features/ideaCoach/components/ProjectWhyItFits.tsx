"use client";

import React from "react";
import { Target } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectWhyItFitsProps {
  reasons: string[];
  revealed: boolean;
}

export function ProjectWhyItFits({
  reasons,
  revealed,
}: ProjectWhyItFitsProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <ProjectSection
      icon={<Target className="w-4 h-4" />}
      title="Why this fits you"
      delay={400}
      revealed={revealed}
    >
      <ul className="space-y-3 sm:space-y-3.5">
        {reasons.map((reason, index) => (
          <li key={index} className="flex gap-3 sm:gap-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">
              {reason}
            </span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
