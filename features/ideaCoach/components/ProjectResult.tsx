"use client";

import React, { useState, useEffect } from "react";
import { StepLayout } from "./StepLayout";
import { useTypewriter } from "@/hooks/useTypewriter";
import { SaveIdeaAlert } from "./SaveIdeaAlert";
import { ProjectResultFooter } from "./ProjectResultFooter";
import { ProjectTitle } from "./ProjectTitle";
import { ProjectPreferences } from "./ProjectPreferences";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectLearning } from "./ProjectLearning";
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
import type { ProjectResultProps } from "../types";

const COOLDOWN_SECONDS = 60;

export function ProjectResult({
  project,
  selections,
  onBack,
  onGenerateAnother,
  isGenerating = false,
  creditsLeft,
  creditsPerMonth,
}: ProjectResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(!!project.savedIdeaId);
  const [isPublic, setIsPublic] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (project.savedIdeaId) {
      const origin = window.location.origin;
      setShareUrl(`${origin}/dashboard/public-ideas?ideaId=${project.savedIdeaId}`);
    } else {
      setShareUrl(window.location.href);
    }
  }, [project.savedIdeaId]);

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
      { project, selections, visibility },
      {
        onSuccess: () => {
          setIsSaved(true);
          if (visibility === "PUBLIC") setIsPublic(true);
        },
        onError: (error) => {
          console.error("Failed to save idea:", error);
        },
      }
    );
  }

  // When user clicks share, make idea PUBLIC first, then show dialog
  function handleShareClick() {
    if (!isPublic && project.savedIdeaId) {
      // Make it public before sharing
      saveIdeaMutation.mutate(
        { project, selections, visibility: "PUBLIC" },
        {
          onSuccess: () => {
            setIsPublic(true);
            setShowShareDialog(true);
          },
          onError: () => {
            // Still show dialog even if save fails
            setShowShareDialog(true);
          },
        }
      );
    } else {
      setShowShareDialog(true);
    }
  }

  function handleGenerateAnother() {
    if (cooldown > 0 || isGenerating) return;
    setShowSaveAlert(true);
  }

  function handleConfirmGenerate(visibility: "PRIVATE" | "PUBLIC" = "PRIVATE") {
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
      <StepLayout title="" subtitle="">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleShareClick}
            disabled={saveIdeaMutation.isPending}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors disabled:opacity-50"
            aria-label="Share project"
          >
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </div>

        <div className="space-y-6">
          <ProjectTitle
            title={project.title || project.projectName || "Project Idea"}
            subtitle={subtitleText}
            revealed={revealed}
          />

          {project.problemSolved && (
            <ProjectProblemStatement
              problemStatement={project.problemSolved}
              revealed={revealed}
            />
          )}

          {!project.problemSolved && project.description && (
            <ProjectDescription
              description={project.description}
              revealed={revealed}
            />
          )}

          <ProjectStats
            features={
              project.mustHaveFeatures?.length ||
              project.features?.length ||
              project.technicalFocus?.length ||
              0
            }
            skills={
              project.whyItFitsYou?.length ||
              project.learningObjectives?.length ||
              project.whatYouWillLearn?.length ||
              0
            }
            revealed={revealed}
          />

          <ProjectPreferences selections={selections} revealed={revealed} />

          {project.whyItFitsYou && project.whyItFitsYou.length > 0 && (
            <ProjectWhyItFits reasons={project.whyItFitsYou} revealed={revealed} />
          )}

          {project.mustHaveFeatures && project.mustHaveFeatures.length > 0 && (
            <ProjectFeatures features={project.mustHaveFeatures} revealed={revealed} />
          )}

          {!project.mustHaveFeatures &&
            project.features &&
            project.features.length > 0 && (
              <ProjectFeatures features={project.features} revealed={revealed} />
            )}

          {project.upgradePaths && (
            <ProjectUpgradePaths
              upgradePaths={project.upgradePaths}
              revealed={revealed}
            />
          )}

          {project.commonMistakes && project.commonMistakes.length > 0 && (
            <ProjectCommonMistakes
              mistakes={project.commonMistakes}
              revealed={revealed}
            />
          )}

          {project.interviewAngle && (
            <ProjectInterviewAngle
              interviewAngle={project.interviewAngle}
              revealed={revealed}
            />
          )}

          {project.firstThingsToGoogle &&
            project.firstThingsToGoogle.length > 0 && (
              <ProjectFirstThingsToGoogle
                searchTerms={project.firstThingsToGoogle}
                revealed={revealed}
              />
            )}

          {project.learningObjectives &&
            project.learningObjectives.length > 0 &&
            !project.whyItFitsYou && (
              <ProjectLearning
                skills={project.learningObjectives}
                revealed={revealed}
              />
            )}

          {project.technicalFocus &&
            project.technicalFocus.length > 0 &&
            !project.mustHaveFeatures && (
              <ProjectTechnicalFocus
                technicalFocus={project.technicalFocus}
                revealed={revealed}
              />
            )}

          {project.starterCodeExamples &&
            project.starterCodeExamples.length > 0 && (
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
            <ProjectRoadmap roadmap={project.projectSteps} revealed={revealed} />
          )}

          {project.designTradeoffs && project.designTradeoffs.length > 0 && (
            <ProjectTradeoffs
              tradeoffs={project.designTradeoffs}
              revealed={revealed}
            />
          )}
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

      <SaveIdeaAlert
        isOpen={showSaveAlert}
        projectTitle={project.projectName || project.title || "Project Idea"}
        onSave={handleConfirmGenerate}
        onSkip={handleSkipSave}
      />

      <ShareProjectDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        projectTitle={project.title || project.projectName || "Project Idea"}
        projectUrl={shareUrl}
      />
    </>
  );
}
