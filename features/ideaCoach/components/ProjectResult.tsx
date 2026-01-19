"use client";

import React, { useState, useEffect } from "react";
import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  RefreshCw,
  Lightbulb,
  ListChecks,
  Award,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  Settings2,
  Code2,
  Gauge,
  Heart,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
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
}

const COOLDOWN_SECONDS = 60;

export function ProjectResult({
  project,
  selections,
  onBack,
  onGenerateAnother,
  isGenerating = false,
}: ProjectResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const subtitleText = useTypewriter(
    revealed
      ? project.problemSolved ??
          "A project tailored to your preferences."
      : "",
    20
  );

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Saved state
  useEffect(() => {
    const savedIdeas = JSON.parse(
      localStorage.getItem("savedIdeas") || "[]"
    );
    const alreadySaved = savedIdeas.some(
      (idea: Project) => idea.title === project.title
    );
    setIsSaved(alreadySaved);
  }, [project.title]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  function handleSave() {
    const savedIdeas = JSON.parse(
      localStorage.getItem("savedIdeas") || "[]"
    );

    if (isSaved) {
      const filtered = savedIdeas.filter(
        (idea: Project) => idea.title !== project.title
      );
      localStorage.setItem("savedIdeas", JSON.stringify(filtered));
      setIsSaved(false);
    } else {
      savedIdeas.push(project);
      localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
      setIsSaved(true);
    }
  }

  function handleGenerateAnother() {
    if (cooldown > 0 || isGenerating) return;
    setCooldown(COOLDOWN_SECONDS);
    onGenerateAnother();
  }

  const canGenerate = cooldown === 0 && !isGenerating;

  return (
    <StepLayout
      title=""
      subtitle=""
      footer={
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-12 flex-1 bg-transparent"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start over
            </Button>

            <Button
              variant="outline"
              className={`h-12 flex-1 bg-transparent transition-colors ${
                isSaved
                  ? "border-accent text-accent hover:bg-accent/10"
                  : ""
              }`}
              onClick={handleSave}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save idea
                </>
              )}
            </Button>
          </div>

          <Button
            className="h-12 w-full"
            onClick={handleGenerateAnother}
            disabled={!canGenerate}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : cooldown > 0 ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Wait {cooldown}s
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate another idea
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Title */}
        <div
          className={`transition-all duration-700 ${
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 text-accent mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">
              Your project idea
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-foreground">
            {project.title}
          </h2>

          {subtitleText && (
            <p className="text-muted-foreground mt-2">
              {subtitleText}
            </p>
          )}
        </div>

        {/* Preferences */}
        <div
          className={`p-4 rounded-lg bg-secondary/50 border border-border transition-all duration-700 ${
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Settings2 className="w-4 h-4" />
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Your preferences
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Preference
              icon={<Code2 className="w-4 h-4 text-accent" />}
              label="Type"
              value={selections.projectType}
            />
            <Preference
              icon={<Gauge className="w-4 h-4 text-accent" />}
              label="Difficulty"
              value={selections.difficulty}
            />
            <Preference
              icon={<Heart className="w-4 h-4 text-accent" />}
              label="Interest"
              value={selections.interest}
            />
            <div className="col-span-2">
              <Preference
                icon={<Sparkles className="w-4 h-4 text-accent" />}
                label="Tech Stack"
                value={selections.techStack.join(", ")}
              />
            </div>
          </div>
        </div>

        {/* Custom problem */}
        {selections.customProblem && (
          <Section
            icon={<Lightbulb className="w-4 h-4" />}
            title="Specific focus you chose"
            delay={300}
            revealed={revealed}
          >
            <p className="text-foreground/90 leading-relaxed">
              {selections.customProblem}
            </p>
          </Section>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <Section
            icon={<ListChecks className="w-4 h-4" />}
            title="Key features"
            delay={500}
            revealed={revealed}
          >
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    revealed
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${600 + i * 80}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Skills */}
        {project.skillsProved?.length > 0 && (
          <Section
            icon={<Award className="w-4 h-4" />}
            title="Skills you'll demonstrate"
            delay={700}
            revealed={revealed}
          >
            <div className="flex flex-wrap gap-2">
              {project.skillsProved.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm bg-secondary rounded-md"
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

/* ---------- Helpers ---------- */

function Preference({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground capitalize">{value}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
  delay = 0,
  revealed,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  revealed: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-lg bg-card border border-border space-y-3 transition-all duration-700 ${
        revealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <h3 className="text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
