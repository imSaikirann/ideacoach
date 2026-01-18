"use client";

import { useState } from "react";
import { ProjectTypeStep } from "./components/ProjectTypeStep";
import { StackStep } from "./components/StackStep";
import { DifficultyStep } from "./components/DifficultyStep";
import { InterestStep } from "./components/InterestStep";
import { ProjectResult } from "./components/ProjectResult";
import { Project } from "./types";


type Step = "projectType" | "stack" | "difficulty" | "interest" | "result";

export function IdeaCoach() {
  const [step, setStep] = useState<Step>("projectType");
  const [projectType, setProjectType] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    try {
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          techStack: techStack.join(", "),
          difficulty,
          interest,
        }),
      });

      const data = await res.json();
      setProject(data);
      setStep("result");
    } catch (error) {
      console.error("Failed to generate idea:", error);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("projectType");
    setProjectType("");
    setTechStack([]);
    setDifficulty("");
    setInterest("");
    setProject(null);
  }

  switch (step) {
    case "projectType":
      return (
        <ProjectTypeStep
          value={projectType}
          onChange={setProjectType}
          onNext={() => setStep("stack")}
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
          onGenerate={generate}
          loading={loading}
        />
      );

    case "result":
      return project ? <ProjectResult project={project} onBack={reset} /> : null;

    default:
      return null;
  }
}
