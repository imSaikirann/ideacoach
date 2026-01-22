"use client";

import React from "react";
import { Clock } from "lucide-react";
import { ProjectSection } from "./ProjectSection";
import { ProjectTimeProps } from "../types";



export function ProjectTime({
  estimatedTime,
  revealed,
}: ProjectTimeProps) {
  if (!estimatedTime) return null;

  return (
    <ProjectSection
      icon={<Clock className="w-4 h-4" />}
      title="Estimated time"
      delay={800}
      revealed={revealed}
    >
      <p className="text-lg font-semibold">
        {estimatedTime.days}
      </p>
      <p className="text-muted-foreground">
        {estimatedTime.dailyEffort}
      </p>
    </ProjectSection>
  );
}
