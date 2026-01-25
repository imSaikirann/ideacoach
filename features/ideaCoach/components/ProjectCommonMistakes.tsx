"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectCommonMistakesProps {
  mistakes: string[];
  revealed: boolean;
}

export function ProjectCommonMistakes({
  mistakes,
  revealed,
}: ProjectCommonMistakesProps) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <ProjectSection
      icon={<AlertTriangle className="w-4 h-4" />}
      title="Common mistakes to avoid"
      delay={700}
      revealed={revealed}
    >
      <ul className="space-y-3 sm:space-y-3.5">
        {mistakes.map((mistake, index) => (
          <li key={index} className="flex gap-3 sm:gap-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-destructive/60 mt-2.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">
              {mistake}
            </span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
