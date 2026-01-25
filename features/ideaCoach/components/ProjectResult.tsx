"use client";

import React, { useState, useEffect } from "react";
import { StepLayout } from "./StepLayout";
import { useTypewriter } from "@/hooks/useTypewriter";
import { SaveIdeaAlert } from "./SaveIdeaAlert";
import { ProjectResultFooter } from "./ProjectResultFooter";
import { ProjectTitle } from "./ProjectTitle";
// import { ProjectCreditsHeader } from "./ProjectCreditsHeader";
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
import { ProjectWhyItFits } from "./ProjectWhyItFits";
import { ProjectUpgradePaths } from "./ProjectUpgradePaths";
import { ProjectCommonMistakes } from "./ProjectCommonMistakes";
import { ProjectInterviewAngle } from "./ProjectInterviewAngle";
import { Share2 } from "lucide-react";
import { ProjectFirstThingsToGoogle } from "./ProjectFirstThingsToGoogle";
import { ShareProjectDialog } from "./ShareProjectDialog";
import { useSaveIdea } from "../hooks/useSaveIdea";
import type { Project, ProjectResultProps } from "../types";
import { ShareProjectCard } from "./ShareProjectCard";


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
  const [isSaved, setIsSaved] = useState(!!project.savedIdeaId);
  const [cooldown, setCooldown] = useState(0);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  const saveIdeaMutation = useSaveIdea();

  const subtitleText = useTypewriter(
    revealed
      ? project.oneLiner ||
          (project.description ??
          project.problemStatement ??
          project.problemSolved ??
          "A project tailored to your preferences.")
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

  function handleSaveIdea(visibility: "PRIVATE" | "PUBLIC" = "PUBLIC") {
    saveIdeaMutation.mutate(
      {
        project,
        selections,
        visibility,
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

  function handleConfirmGenerate(visibility: "PRIVATE" | "PUBLIC" = "PRIVATE") {
    // Save the idea before generating another (PRIVATE by default)
    if (!isSaved) {
      handleSaveIdea(visibility);
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
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowShareDialog(true)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Share project"
          >
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>
        <div className="space-y-6">
          {/* Credits Header */}
          {/* <div
            className={`transition-all duration-700 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ProjectCreditsHeader
              creditsLeft={creditsLeft}
              creditsPerMonth={creditsPerMonth}
            />
          </div> */}

          {/* Title */}
          <ProjectTitle
            title={project.title || project.projectName || "Project Idea"}
            subtitle={subtitleText}
            revealed={revealed}
          />

          {/* Problem Solved */}
          {project.problemSolved && (
            <ProjectProblemStatement
              problemStatement={project.problemSolved}
              revealed={revealed}
            />
          )}

          {/* Legacy description fallback */}
          {!project.problemSolved && project.description && (
            <ProjectDescription
              description={project.description}
              revealed={revealed}
            />
          )}

          {/* Stats Overview */}
          <ProjectStats
            features={project.mustHaveFeatures?.length || project.features?.length || project.technicalFocus?.length || 0}
            skills={project.whyItFitsYou?.length || project.learningObjectives?.length || project.whatYouWillLearn?.length || 0}
            revealed={revealed}
          />

          {/* Preferences */}
          <ProjectPreferences
            selections={selections}
            revealed={revealed}
          />

          {/* Why It Fits You */}
          {project.whyItFitsYou && project.whyItFitsYou.length > 0 && (
            <ProjectWhyItFits
              reasons={project.whyItFitsYou}
              revealed={revealed}
            />
          )}

          {/* Must Have Features */}
          {project.mustHaveFeatures && project.mustHaveFeatures.length > 0 && (
            <ProjectFeatures
              features={project.mustHaveFeatures}
              revealed={revealed}
            />
          )}

          {/* Legacy features fallback */}
          {!project.mustHaveFeatures && project.features && project.features.length > 0 && (
            <ProjectFeatures
              features={project.features}
              revealed={revealed}
            />
          )}

          {/* Upgrade Paths */}
          {project.upgradePaths && (
            <ProjectUpgradePaths
              upgradePaths={project.upgradePaths}
              revealed={revealed}
            />
          )}

          {/* Common Mistakes */}
          {project.commonMistakes && project.commonMistakes.length > 0 && (
            <ProjectCommonMistakes
              mistakes={project.commonMistakes}
              revealed={revealed}
            />
          )}

          {/* Interview Angle */}
          {project.interviewAngle && (
            <ProjectInterviewAngle
              interviewAngle={project.interviewAngle}
              revealed={revealed}
            />
          )}

          {/* First Things to Google */}
          {project.firstThingsToGoogle && project.firstThingsToGoogle.length > 0 && (
            <ProjectFirstThingsToGoogle
              searchTerms={project.firstThingsToGoogle}
              revealed={revealed}
            />
          )}

          {/* Legacy sections for backward compatibility */}
          {project.learningObjectives && project.learningObjectives.length > 0 && !project.whyItFitsYou && (
            <ProjectLearning
              skills={project.learningObjectives}
              revealed={revealed}
            />
          )}

          {project.technicalFocus && project.technicalFocus.length > 0 && !project.mustHaveFeatures && (
            <ProjectTechnicalFocus
              technicalFocus={project.technicalFocus}
              revealed={revealed}
            />
          )}

          {project.starterCodeExamples && project.starterCodeExamples.length > 0 && (
            <ProjectStarterCode
              starterCodeExamples={project.starterCodeExamples}
              revealed={revealed}
            />
          )}

          {project.stretchGoals && project.stretchGoals.length > 0 && (
            <ProjectStretchGoals
              stretchGoals={project.stretchGoals}
              revealed={revealed}
            />
          )}

          {project.projectSteps && project.projectSteps.length > 0 && (
            <ProjectRoadmap
              roadmap={project.projectSteps}
              revealed={revealed}
            />
          )}

          {project.designTradeoffs && project.designTradeoffs.length > 0 && (
            <ProjectTradeoffs
              tradeoffs={project.designTradeoffs}
              revealed={revealed}
            />
          )}

          {/* Share Project Card */}
          {/* <ShareProjectCard
            projectTitle={project.title || project.projectName || "Project Idea"}
            revealed={revealed}
          /> */}
        </div>
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
      </StepLayout>

      {/* Save Idea Alert */}
      <SaveIdeaAlert
        isOpen={showSaveAlert}
        projectTitle={project.projectName || project.title || "Project Idea"}
        onSave={handleConfirmGenerate}
        onSkip={handleSkipSave}
      />

      {/* Share Dialog */}
      <ShareProjectDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        projectTitle={project.title || project.projectName || "Project Idea"}
      />
    </>
  );
}
