'use client';

import { levels } from "../constants";
import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Zap, Flame, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface DifficultyStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const levelConfig = {
  Beginner: {
    icon: Zap,
    description: "Simple concepts, quick to build",
  },
  Intermediate: {
    icon: Flame,
    description: "More features, moderate complexity",
  },
  Advanced: {
    icon: Rocket,
    description: "Complex architecture, full-stack",
  },
};

export function DifficultyStep({
  value,
  onChange,
  onBack,
  onNext,
}: DifficultyStepProps) {
  return (
    <StepLayout
      title="How challenging should it be?"
      subtitle="Choose a difficulty level that matches your skills"
      currentStep={3}
      totalSteps={4}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1 bg-transparent" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            className="h-12 flex-1"
            disabled={!value}
            onClick={onNext}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      }
    >
      <div className="grid gap-3">
        {levels.map((level) => {
          const config = levelConfig[level as keyof typeof levelConfig];
          const Icon = config.icon;
          const isActive = value === level;

          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg border text-left transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-accent bg-accent/10"
                  : "border-border bg-secondary/50 hover:border-accent/50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">{level}</p>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
