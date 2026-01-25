"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectInterviewAngleProps {
  interviewAngle: {
    explain: string;
    tradeoffs: string[];
    improvements: string[];
  };
  revealed: boolean;
}

export function ProjectInterviewAngle({
  interviewAngle,
  revealed,
}: ProjectInterviewAngleProps) {
  if (!interviewAngle.explain && interviewAngle.tradeoffs.length === 0 && interviewAngle.improvements.length === 0) {
    return null;
  }

  return (
    <ProjectSection
      icon={<Briefcase className="w-4 h-4" />}
      title="Interview angle"
      delay={800}
      revealed={revealed}
    >
      <div className="space-y-5 sm:space-y-6">
        {interviewAngle.explain && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">How to explain it</h4>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {interviewAngle.explain}
            </p>
          </div>
        )}

        {interviewAngle.tradeoffs.length > 0 && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Tradeoffs to discuss</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {interviewAngle.tradeoffs.map((tradeoff, index) => (
                <li key={index} className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {interviewAngle.improvements.length > 0 && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Potential improvements</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {interviewAngle.improvements.map((improvement, index) => (
                <li key={index} className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProjectSection>
  );
}
