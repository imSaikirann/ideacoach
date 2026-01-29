"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ProjectTypeStep } from "./components/ProjectTypeStep";
import { StackStep } from "./components/StackStep";
import { DifficultyStep } from "./components/DifficultyStep";
import { InterestStep } from "./components/InterestStep";
import { CustomProblemStep } from "./components/CustomProblemStep";
import { ProjectResult } from "./components/ProjectResult";
import { ErrorState } from "./components/ErrorState";
import { GeneratingScreen } from "./components/GeneratingScreen";

import type { Project } from "./types";
import { useCredits } from "./hooks/useCredits";
import { useGenerateIdea } from "./hooks/useGenerateIdea";

/* ---------------------------------------------
 * Types
 * -------------------------------------------*/

type Step =
  | "projectType"
  | "stack"
  | "difficulty"
  | "interest"
  | "customProblem"
  | "result";

type PersistedIdeaCoachState = {
  version: 1;
  project: Project;
  selections: {
    projectType: string;
    techStack: string[];
    difficulty: string;
    interest: string;
    customProblem?: string;
  };
  savedAt: number;
};

const STORAGE_KEY = "ideacoach:lastProject";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

/* ---------------------------------------------
 * Component
 * -------------------------------------------*/

export function IdeaCoach() {
  /* ---------- hydration guard ---------- */
  const [hydrated, setHydrated] = useState(false);

  /* ---------- flow state ---------- */
  const [step, setStep] = useState<Step>("projectType");

  const [projectType, setProjectType] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");
  const [customProblem, setCustomProblem] = useState("");

  const [project, setProject] = useState<Project | null>(null);

  /* ---------- data ---------- */
  const { data: credits, isLoading } = useCredits();
  const generateIdeaMutation = useGenerateIdea();

  const loading = generateIdeaMutation.isPending;
  const error = generateIdeaMutation.error as Error | null;

  /* ---------------------------------------------
   * Restore persisted state
   * -------------------------------------------*/

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as PersistedIdeaCoachState;

      if (parsed.version !== 1) {
        localStorage.removeItem(STORAGE_KEY);
        setHydrated(true);
        return;
      }

      if (Date.now() - parsed.savedAt > ONE_WEEK) {
        localStorage.removeItem(STORAGE_KEY);
        setHydrated(true);
        return;
      }

      setProject(parsed.project);
      setProjectType(parsed.selections.projectType);
      setTechStack(parsed.selections.techStack);
      setDifficulty(parsed.selections.difficulty);
      setInterest(parsed.selections.interest);
      setCustomProblem(parsed.selections.customProblem ?? "");
      setStep("result");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  /* ---------------------------------------------
   * Generate project
   * -------------------------------------------*/

  async function generate() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const data = await generateIdeaMutation.mutateAsync({
        projectType,
        techStack: techStack.join(", "),
        difficulty,
        interest,
        customProblem,
      });

      const payload: PersistedIdeaCoachState = {
        version: 1,
        project: data,
        selections: {
          projectType,
          techStack,
          difficulty,
          interest,
          customProblem: customProblem || undefined,
        },
        savedAt: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      setProject(data);
      setStep("result");
    } catch {
      // handled globally
    }
  }

  /* ---------------------------------------------
   * Reset
   * -------------------------------------------*/

  function reset() {
    localStorage.removeItem(STORAGE_KEY);

    generateIdeaMutation.reset();
    setStep("projectType");
    setProjectType("");
    setTechStack([]);
    setDifficulty("");
    setInterest("");
    setCustomProblem("");
    setProject(null);
  }

  /* ---------------------------------------------
   * 🚫 Hard stop until hydrated
   * -------------------------------------------*/

  if (!hydrated) return null;

  if (loading) return <GeneratingScreen isGenerating />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl p-4">
        <ErrorState
          title="Idea generation failed"
          message={error.message}
          onRetry={generate}
          onDismiss={() => generateIdeaMutation.reset()}
        />
      </div>
    );
  }

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {step === "projectType" && (
        <ProjectTypeStep
          value={projectType}
          onChange={setProjectType}
          onNext={() => setStep("stack")}
          creditsLeft={credits?.creditsLeft ?? 0}
          creditsPerMonth={credits?.creditsPerMonth ?? 0}
          loading={isLoading}
        />
      )}

      {step === "stack" && (
        <StackStep
          projectType={projectType}
          value={techStack}
          onChange={setTechStack}
          onBack={() => setStep("projectType")}
          onNext={() => setStep("difficulty")}
        />
      )}

      {step === "difficulty" && (
        <DifficultyStep
          value={difficulty}
          onChange={setDifficulty}
          onBack={() => setStep("stack")}
          onNext={() => setStep("interest")}
        />
      )}

      {step === "interest" && (
        <InterestStep
          value={interest}
          onChange={setInterest}
          onBack={() => setStep("difficulty")}
          onNext={() => setStep("customProblem")}
        />
      )}

      {step === "customProblem" && (
        <CustomProblemStep
          value={customProblem}
          onChange={setCustomProblem}
          onBack={() => setStep("interest")}
          onGenerate={generate}
          loading={loading}
          creditsLeft={credits?.creditsLeft ?? 0}
          creditsPerMonth={credits?.creditsPerMonth ?? 0}
        />
      )}

      {step === "result" && project && (
        <ProjectResult
          project={project}
          selections={{
            projectType,
            techStack,
            difficulty,
            interest,
            customProblem: customProblem || undefined,
          }}
          onBack={reset}
          onGenerateAnother={generate}
          isGenerating={loading}
          creditsLeft={credits?.creditsLeft ?? 0}
          creditsPerMonth={credits?.creditsPerMonth ?? 0}
        />
      )}
    </motion.div>
  );
}
