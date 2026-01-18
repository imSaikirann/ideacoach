'use client';

import { stacksByType } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StackStepProps {
  projectType: string;
  value: string[];
  onChange: (value: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StackStep({
  projectType,
  value,
  onChange,
  onBack,
  onNext,
}: StackStepProps) {
  const stacksList = projectType && stacksByType[projectType as keyof typeof stacksByType] ? stacksByType[projectType as keyof typeof stacksByType] : [];

  const toggleStack = (stack: string) => {
    onChange(
      value.includes(stack) ? value.filter((s) => s !== stack) : [...value, stack]
    );
  };

  return (
    <StepLayout
      title="Pick your tech stack"
      subtitle={`Select one or more technologies for your ${projectType.toLowerCase()}`}
      currentStep={2}
      totalSteps={4}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1 bg-transparent" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            className="h-12 flex-1"
            disabled={!value.length}
            onClick={onNext}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        {stacksList.map((stack) => (
          <Chip
            key={stack}
            active={value.includes(stack)}
            onClick={() => toggleStack(stack)}
          >
            {stack}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
