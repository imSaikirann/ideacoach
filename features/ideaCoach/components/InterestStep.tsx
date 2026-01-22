"use client";

import { interests } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InterestStepProps } from "../types";


export function InterestStep({
  value,
  onChange,
  onBack,
  onNext,
}: InterestStepProps) {
  return (
    <StepLayout
      title="What field interests you?"
      subtitle="Choose a domain for your project"
      currentStep={4}
      totalSteps={5}
      footer={
        <div className="flex gap-3">
          {/* Back */}
          <Button
            variant="outline"
            className="h-12 flex-1 bg-transparent"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Continue */}
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
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Chip
            key={interest}
            active={value === interest}
            onClick={() => onChange(interest)}
          >
            {interest}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
