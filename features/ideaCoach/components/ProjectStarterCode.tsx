"use client";

import React from "react";
import { Code } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectStarterCodeProps {
  starterCodeExamples: string[];
  revealed: boolean;
}

export function ProjectStarterCode({
  starterCodeExamples,
  revealed,
}: ProjectStarterCodeProps) {
  if (!starterCodeExamples || starterCodeExamples.length === 0) return null;

  return (
    <ProjectSection
      icon={<Code className="w-4 h-4" />}
      title="Starter Code Examples"
      delay={700}
      revealed={revealed}
    >
      <div className="rounded-lg bg-muted/30 border border-border p-4 overflow-x-auto">
        <pre className="text-xs sm:text-sm text-foreground/90 font-mono leading-relaxed whitespace-pre">
          {starterCodeExamples.join("\n")}
        </pre>
      </div>
    </ProjectSection>
  );
}
