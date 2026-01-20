"use client";

import React, { useState, useEffect } from "react";
import { StepLayout } from "./StepLayout";
import { useTypewriter } from "@/hooks/useTypewriter";
import { SaveIdeaAlert } from "./SaveIdeaAlert";
import { ProjectResultFooter } from "./ProjectResultFooter";
import { ProjectTitle } from "./ProjectTitle";
import { ProjectCreditsHeader } from "./ProjectCreditsHeader";
import { ProjectPreferences } from "./ProjectPreferences";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectLearning } from "./ProjectLearning";
import { ProjectTime } from "./ProjectTime";
import { ProjectRoadmap } from "./ProjectRoadmap";
import { ProjectTradeoffs } from "./ProjectTradeoffs";
import { ProjectProblemStatement } from "./ProjectProblemStatement";
import { ProjectStats } from "./ProjectStats";
import type { Project } from "../types";

interface UserSelections {
  projectType: string;
  techStack: string[];
  difficulty: string;
  interest: string;
  customProblem?: string;
}

interface ProjectResultProps {
  project: Project;
  selections: UserSelections;
  onBack: () => void;
  onGenerateAnother: () => void;
  isGenerating?: boolean;
  creditsLeft?: number;
  creditsPerMonth?: number;
}

const COOLDOWN_SECONDS = 60;

export function ProjectResult({
  project,
  selections,
  onBack,
  onGenerateAnother,
  isGenerating = false,
  creditsLeft = 10,
  creditsPerMonth = 50,
}: ProjectResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const subtitleText = useTypewriter(
    revealed
      ? project.problemStatement ??
          project.problemSolved ??
          "A project tailored to your preferences."
      : "",
    20
  );

  /* Reveal animation */
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* Cooldown */
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(
      () => setCooldown((prev) => Math.max(0, prev - 1)),
      1000
    );
    return () => clearInterval(interval);
  }, [cooldown]);

  function handleGenerateAnother() {
    if (cooldown > 0 || isGenerating) return;
    
    // Show save alert before generating
    setShowSaveAlert(true);
  }

  function handleConfirmGenerate() {
    setCooldown(COOLDOWN_SECONDS);
    setShowSaveAlert(false);
    onGenerateAnother();
  }

  return (
    <>
      <StepLayout
        title=""
        subtitle=""
        footer={
          <ProjectResultFooter
            isSaved={isSaved}
            cooldown={cooldown}
            isGenerating={isGenerating}
            onBack={onBack}
            onGenerateAnother={handleGenerateAnother}
          />
        }
      >
        <div className="space-y-6">
          {/* Credits Header */}
          <div
            className={`transition-all duration-700 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ProjectCreditsHeader
              creditsLeft={creditsLeft}
              creditsPerMonth={creditsPerMonth}
            />
          </div>

          {/* Title */}
          <ProjectTitle
            title={project.title}
            subtitle={subtitleText}
            revealed={revealed}
          />

          {/* Problem Statement */}
          {project.problemStatement && (
            <ProjectProblemStatement
              problemStatement={project.problemStatement}
              revealed={revealed}
            />
          )}

          {/* Stats Overview */}
          <ProjectStats
            features={project.features?.length || 0}
            skills={project.whatYouWillLearn?.length || 0}
            revealed={revealed}
          />

          {/* Preferences */}
          <ProjectPreferences
            selections={selections}
            revealed={revealed}
          />

          {/* Features */}
          <ProjectFeatures
            features={project.features ?? []}
            revealed={revealed}
          />

          {/* What you will learn */}
          <ProjectLearning
            skills={project.whatYouWillLearn ?? []}
            revealed={revealed}
          />

          {/* Estimated time */}
          {project.estimatedTime && (
            <ProjectTime
              estimatedTime={project.estimatedTime}
              revealed={revealed}
            />
          )}

          {/* Build Roadmap */}
          <ProjectRoadmap
            roadmap={project.buildRoadmap ?? []}
            revealed={revealed}
          />

          {/* Design Tradeoffs */}
          <ProjectTradeoffs
            tradeoffs={project.designTradeoffs ?? []}
            revealed={revealed}
          />
        </div>
      </StepLayout>

      {/* Save Idea Alert */}
      <SaveIdeaAlert
        isOpen={showSaveAlert}
        projectTitle={project.title}
        onSave={handleConfirmGenerate}
        onSkip={() => {
          setCooldown(COOLDOWN_SECONDS);
          setShowSaveAlert(false);
          onGenerateAnother();
        }}
      />
    </>
  );
}
