"use client";

import React from "react";
import { FileText } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectDescriptionProps {
  description: string;
  revealed: boolean;
}

export function ProjectDescription({
  description,
  revealed,
}: ProjectDescriptionProps) {
  if (!description) return null;

  return (
    <ProjectSection
      icon={<FileText className="w-4 h-4" />}
      title="Project Description"
      delay={300}
      revealed={revealed}
    >
      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </ProjectSection>
  );
}
