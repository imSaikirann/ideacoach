"use client";

import React from "react";
import { Target } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectStretchGoalsProps {
  stretchGoals: string[];
  revealed: boolean;
}

export function ProjectStretchGoals({
  stretchGoals,
  revealed,
}: ProjectStretchGoalsProps) {
  if (!stretchGoals || stretchGoals.length === 0) return null;

  return (
    <ProjectSection
      icon={<Target className="w-4 h-4" />}
      title="Stretch Goals"
      delay={800}
      revealed={revealed}
    >
      <ul className="space-y-2.5">
        {stretchGoals.map((goal, index) => (
          <li key={index} className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {goal}
            </span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
