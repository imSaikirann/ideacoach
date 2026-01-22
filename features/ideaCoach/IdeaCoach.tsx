"use client";

import { useState } from "react";

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

type Step =
  | "projectType"
  | "stack"
  | "difficulty"
  | "interest"
  | "customProblem"
  | "result";

export function IdeaCoach() {
  const [step, setStep] = useState<Step>("projectType");

  const [projectType, setProjectType] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");
  const [customProblem, setCustomProblem] = useState("");

  const [project, setProject] = useState<Project | null>(null);

  const { data: credits } = useCredits();
  const generateIdeaMutation = useGenerateIdea();

  const loading = generateIdeaMutation.isPending;
  const error = generateIdeaMutation.error as Error | null


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

      setProject(data);
      setStep("result");
    } catch {
      // ❌ No console.error needed
      // Error UI is handled declaratively
    }
  }

  function reset() {
    generateIdeaMutation.reset();
    setStep("projectType");
    setProjectType("");
    setTechStack([]);
    setDifficulty("");
    setInterest("");
    setCustomProblem("");
    setProject(null);
  }

  // 🔴 Show generating screen when loading
  if (loading) {
    return <GeneratingScreen isGenerating={loading} />;
  }

  // 🔴 Global error display (shown on any step)
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

  switch (step) {
    case "projectType":
      return (
        <ProjectTypeStep
          value={projectType}
          onChange={setProjectType}
          onNext={() => setStep("stack")}
          creditsLeft={credits?.creditsLeft ?? 0}
          creditsPerMonth={credits?.creditsPerMonth ?? 0}
        />
      );

    case "stack":
      return (
        <StackStep
          projectType={projectType}
          value={techStack}
          onChange={setTechStack}
          onBack={() => setStep("projectType")}
          onNext={() => setStep("difficulty")}
        />
      );

    case "difficulty":
      return (
        <DifficultyStep
          value={difficulty}
          onChange={setDifficulty}
          onBack={() => setStep("stack")}
          onNext={() => setStep("interest")}
        />
      );

    case "interest":
      return (
        <InterestStep
          value={interest}
          onChange={setInterest}
          onBack={() => setStep("difficulty")}
          onNext={() => setStep("customProblem")}
        />
      );

    case "customProblem":
      return (
        <CustomProblemStep
          value={customProblem}
          onChange={setCustomProblem}
          onBack={() => setStep("interest")}
          onGenerate={generate}
          loading={loading}
          creditsLeft={credits?.creditsLeft ?? 0}
          creditsPerMonth={credits?.creditsPerMonth ?? 0}
        />
      );

    case "result":
      return project ? (
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
      ) : null;

    default:
      return null;
  }
}
