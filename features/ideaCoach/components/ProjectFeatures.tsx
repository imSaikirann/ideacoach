"use client";

import React from "react";
import { ListChecks } from "lucide-react";
import { ProjectSection } from "./ProjectSection";
import { ProjectFeaturesProps } from "../types";



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
      <ul className="space-y-3 sm:space-y-3.5">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-3 sm:gap-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">{feature}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
