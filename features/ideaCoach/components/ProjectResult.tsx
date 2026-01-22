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
import { ProjectDescription } from "./ProjectDescription";
import { ProjectTechnicalFocus } from "./ProjectTechnicalFocus";
import { ProjectStarterCode } from "./ProjectStarterCode";
import { ProjectStretchGoals } from "./ProjectStretchGoals";
import { useSaveIdea } from "../hooks/useSaveIdea";
import type { Project, ProjectResultProps } from "../types";


const COOLDOWN_SECONDS = 60;

export function ProjectResult({
  project,
  selections,
  onBack,
  onGenerateAnother,
  isGenerating = false,
  creditsLeft ,
  creditsPerMonth
}: ProjectResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  
  const saveIdeaMutation = useSaveIdea();

  const subtitleText = useTypewriter(
    revealed
      ? project.description ??
          project.problemStatement ??
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

  function handleSaveIdea() {
    saveIdeaMutation.mutate(
      {
        project,
        selections,
        visibility: "PUBLIC", // Save as public to show in public ideas
      },
      {
        onSuccess: () => {
          setIsSaved(true);
        },
        onError: (error) => {
          console.error("Failed to save idea:", error);
        },
      }
    );
  }

  function handleGenerateAnother() {
    if (cooldown > 0 || isGenerating) return;
    
    // Show save alert before generating
    setShowSaveAlert(true);
  }

  function handleConfirmGenerate() {
    // Save the idea before generating another
    if (!isSaved) {
      handleSaveIdea();
    }
    setCooldown(COOLDOWN_SECONDS);
    setShowSaveAlert(false);
    onGenerateAnother();
  }

  function handleSkipSave() {
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
            onSave={handleSaveIdea}
            isSaving={saveIdeaMutation.isPending}
            creditsLeft={creditsLeft!}
            creditsPerMonth={creditsPerMonth!}
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
            title={project.projectName || project.title || "Project Idea"}
            subtitle={subtitleText}
            revealed={revealed}
          />

          {/* Description */}
          {project.description && (
            <ProjectDescription
              description={project.description}
              revealed={revealed}
            />
          )}

          {/* Problem Statement (legacy) */}
          {project.problemStatement && !project.description && (
            <ProjectProblemStatement
              problemStatement={project.problemStatement}
              revealed={revealed}
            />
          )}

          {/* Stats Overview */}
          <ProjectStats
            features={project.features?.length || project.technicalFocus?.length || 0}
            skills={project.learningObjectives?.length || project.whatYouWillLearn?.length || 0}
            revealed={revealed}
          />

          {/* Preferences */}
          <ProjectPreferences
            selections={selections}
            revealed={revealed}
          />

          {/* Learning Objectives */}
          {project.learningObjectives && project.learningObjectives.length > 0 && (
            <ProjectLearning
              skills={project.learningObjectives}
              revealed={revealed}
            />
          )}

          {/* What you will learn (legacy) */}
          {project.whatYouWillLearn && project.whatYouWillLearn.length > 0 && !project.learningObjectives && (
            <ProjectLearning
              skills={project.whatYouWillLearn}
              revealed={revealed}
            />
          )}

          {/* Technical Focus */}
          {project.technicalFocus && project.technicalFocus.length > 0 && (
            <ProjectTechnicalFocus
              technicalFocus={project.technicalFocus}
              revealed={revealed}
            />
          )}

          {/* Features (legacy) */}
          {project.features && project.features.length > 0 && !project.technicalFocus && (
            <ProjectFeatures
              features={project.features}
              revealed={revealed}
            />
          )}

          {/* Starter Code Examples */}
          {project.starterCodeExamples && project.starterCodeExamples.length > 0 && (
            <ProjectStarterCode
              starterCodeExamples={project.starterCodeExamples}
              revealed={revealed}
            />
          )}

          {/* Stretch Goals */}
          {project.stretchGoals && project.stretchGoals.length > 0 && (
            <ProjectStretchGoals
              stretchGoals={project.stretchGoals}
              revealed={revealed}
            />
          )}

          {/* Estimated time */}
          {project.estimatedTime && (
            <ProjectTime
              estimatedTime={project.estimatedTime}
              revealed={revealed}
            />
          )}

          {/* Build Roadmap */}
          {project.buildRoadmap && project.buildRoadmap.length > 0 && (
            <ProjectRoadmap
              roadmap={project.buildRoadmap}
              revealed={revealed}
            />
          )}

          {/* Design Tradeoffs */}
          {project.designTradeoffs && project.designTradeoffs.length > 0 && (
            <ProjectTradeoffs
              tradeoffs={project.designTradeoffs}
              revealed={revealed}
            />
          )}
        </div>
      </StepLayout>

      {/* Save Idea Alert */}
      <SaveIdeaAlert
        isOpen={showSaveAlert}
        projectTitle={project.projectName || project.title || "Project Idea"}
        onSave={handleConfirmGenerate}
        onSkip={handleSkipSave}
      />
    </>
  );
}
