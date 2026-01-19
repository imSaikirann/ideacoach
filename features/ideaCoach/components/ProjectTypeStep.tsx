'use client';

import { projectTypes } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProjectTypeStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function ProjectTypeStep({ value, onChange, onNext }: ProjectTypeStepProps) {
  return (
    <StepLayout
      title="What do you want to build?"
      subtitle="Select the type of project you have in mind"
      currentStep={1}
      totalSteps={5}
      footer={
        <Button
          className="w-full h-12 font-medium"
          disabled={!value}
          onClick={onNext}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {projectTypes.map((type) => (
          <Chip key={type} active={value === type} onClick={() => onChange(type)}>
            {type}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
