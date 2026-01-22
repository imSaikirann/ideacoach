"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectTechnicalFocusProps {
  technicalFocus: string[];
  revealed: boolean;
}

export function ProjectTechnicalFocus({
  technicalFocus,
  revealed,
}: ProjectTechnicalFocusProps) {
  if (!technicalFocus || technicalFocus.length === 0) return null;

  return (
    <ProjectSection
      icon={<Code2 className="w-4 h-4" />}
      title="Technical Focus"
      delay={500}
      revealed={revealed}
    >
      <ul className="space-y-2.5">
        {technicalFocus.map((focus, index) => (
          <li key={index} className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {focus}
            </span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
