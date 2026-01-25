"use client";

import React from "react";
import { Clock } from "lucide-react";
import { ProjectSection } from "./ProjectSection";
import { ProjectTimeProps } from "../types";



export function ProjectTime({
  estimatedTime,
}: ProjectTimeProps) {
  if (!estimatedTime) return null;

  return (
    <ProjectSection
      icon={<Clock className="w-4 h-4" />}
      title="Estimated time"
      delay={800}
      revealed={true}
    >
      <p className="text-lg font-semibold">
        {estimatedTime}
      </p>
     
    </ProjectSection>
  );
}
