"use client";

import { useState } from "react";
import { ProjectTypeStep } from "./components/ProjectTypeStep";
import { StackStep } from "./components/StackStep";
import { DifficultyStep } from "./components/DifficultyStep";
import { InterestStep } from "./components/InterestStep";
import { ProjectResult } from "./components/ProjectResult";
import { Project } from "./types";

export function IdeaCoach() {
  const [step, setStep] = useState<"projectType" | "stack" | "difficulty" | "interest" | "result">("projectType");

  const [projectType, setProjectType] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    const res = await fetch("/api/generate-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        techStack: techStack.join(", "),
        difficulty,
        interest,
      }),
    });

    const data = await res.json();
    setProject(data);
    setLoading(false);
    setStep("result");
  }

  if (step === "projectType") {
    return (
      <ProjectTypeStep
        value={projectType}
        onChange={setProjectType}
        onNext={() => setStep("stack")}
      />
    );
  }

  if (step === "stack") {
    return (
      <StackStep
        projectType={projectType}
        value={techStack}
        onChange={setTechStack}
        onBack={() => setStep("projectType")}
        onNext={() => setStep("difficulty")}
      />
    );
  }

  if (step === "difficulty") {
    return (
      <DifficultyStep
        value={difficulty}
        onChange={setDifficulty}
        onBack={() => setStep("stack")}
        onNext={() => setStep("interest")}
      />
    );
  }

  if (step === "interest") {
    return (
      <InterestStep
        value={interest}
        onChange={setInterest}
        onBack={() => setStep("difficulty")}
        onGenerate={generate}
        loading={loading}
      />
    );
  }

  if (step === "result" && project) {
    return <ProjectResult project={project} />;
  }

  return null;
}
