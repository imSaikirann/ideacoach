"use client";

import React from "react"

import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lightbulb, ListChecks, Award } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { Project } from "../types";

interface ProjectResultProps {
  project: Project;
  onBack: () => void;
}

export function ProjectResult({ project, onBack }: ProjectResultProps) {
  const whyText = useTypewriter(project.whyThisProject ?? "");
  const subtitleText = useTypewriter(
    project.problemSolved ?? "A project tailored to your preferences."
  );

  return (
    <StepLayout
      title={project.title}
      subtitle={subtitleText}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1 bg-transparent" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start over
          </Button>
          <Button className="h-12 flex-1">
            Start building
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {project.whyThisProject && (
          <Section icon={<Lightbulb className="w-4 h-4" />} title="Why this project">
            <p className="text-foreground/90 leading-relaxed">
              {whyText}
              <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse align-middle" />
            </p>
          </Section>
        )}

        {project.features && project.features.length > 0 && (
          <Section icon={<ListChecks className="w-4 h-4" />} title="Key features">
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.skillsProved && project.skillsProved.length > 0 && (
          <Section icon={<Award className="w-4 h-4" />} title="Skills you'll demonstrate">
            <div className="flex flex-wrap gap-2">
              {project.skillsProved.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm bg-secondary rounded-md text-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </StepLayout>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-lg bg-card border border-border space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}
