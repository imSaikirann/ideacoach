"use client";

import React from "react";
import { ListChecks } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectFeaturesProps {
  features: string[];
  revealed: boolean;
}

export function ProjectFeatures({
  features,
  revealed,
}: ProjectFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <ProjectSection
      icon={<ListChecks className="w-4 h-4" />}
      title="Key features"
      delay={400}
      revealed={revealed}
    >
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
