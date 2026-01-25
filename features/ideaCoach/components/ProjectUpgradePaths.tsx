"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { ProjectSection } from "./ProjectSection";

interface ProjectUpgradePathsProps {
  upgradePaths: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  revealed: boolean;
}

export function ProjectUpgradePaths({
  upgradePaths,
  revealed,
}: ProjectUpgradePathsProps) {
  const hasAny = upgradePaths.beginner.length > 0 || 
                 upgradePaths.intermediate.length > 0 || 
                 upgradePaths.advanced.length > 0;

  if (!hasAny) return null;

  return (
    <ProjectSection
      icon={<TrendingUp className="w-4 h-4" />}
      title="Upgrade paths"
      delay={600}
      revealed={revealed}
    >
      <div className="space-y-5 sm:space-y-6">
        {upgradePaths.beginner.length > 0 && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Beginner</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {upgradePaths.beginner.map((path, index) => (
                <li key={index} className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{path}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {upgradePaths.intermediate.length > 0 && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Intermediate</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {upgradePaths.intermediate.map((path, index) => (
                <li key={index} className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{path}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {upgradePaths.advanced.length > 0 && (
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">Advanced</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {upgradePaths.advanced.map((path, index) => (
                <li key={index} className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{path}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProjectSection>
  );
}
