"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { ProjectSection } from "./ProjectSection";
import { ProjectLearningProps } from "../types";


export function ProjectLearning({
  skills,
  revealed,
}: ProjectLearningProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <ProjectSection
      icon={<GraduationCap className="w-4 h-4" />}
      title="What you'll learn"
      delay={600}
      revealed={revealed}
    >
      <ul className="grid sm:grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm"
          >
            {skill}
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
