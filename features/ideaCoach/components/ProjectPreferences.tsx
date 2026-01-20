"use client";

import React from "react";
import { Code2, Gauge, Heart, Sparkles, Settings2 } from "lucide-react";
import { ProjectSection } from "./ProjectSection";
import { PreferenceItem } from "./PreferenceItem";

interface UserSelections {
  projectType: string;
  techStack: string[];
  difficulty: string;
  interest: string;
}

interface ProjectPreferencesProps {
  selections: UserSelections;
  revealed: boolean;
}

export function ProjectPreferences({
  selections,
  revealed,
}: ProjectPreferencesProps) {
  return (
    <ProjectSection
      icon={<Settings2 className="w-4 h-4" />}
      title="Your preferences"
      delay={200}
      revealed={revealed}
    >
      <div className="grid grid-cols-2 gap-3">
        <PreferenceItem
          label="Type"
          value={selections.projectType}
          icon={<Code2 className="w-4 h-4 text-accent" />}
        />
        <PreferenceItem
          label="Difficulty"
          value={selections.difficulty}
          icon={<Gauge className="w-4 h-4 text-accent" />}
        />
        <PreferenceItem
          label="Interest"
          value={selections.interest}
          icon={<Heart className="w-4 h-4 text-accent" />}
        />
        <PreferenceItem
          label="Tech Stack"
          value={selections.techStack.join(", ")}
          icon={<Sparkles className="w-4 h-4 text-accent" />}
        />
      </div>
    </ProjectSection>
  );
}
