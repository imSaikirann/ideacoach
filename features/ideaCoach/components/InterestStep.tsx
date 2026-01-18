'use client';

import { interests } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";

interface InterestStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  loading?: boolean;
}

export function InterestStep({
  value,
  onChange,
  onBack,
  onGenerate,
  loading,
}: InterestStepProps) {
  return (
    <StepLayout
      title="What field interests you?"
      subtitle="Choose a domain for your project"
      currentStep={4}
      totalSteps={4}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1 bg-transparent" onClick={onBack} disabled={loading}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            className="h-12 flex-1"
            disabled={!value || loading}
            onClick={onGenerate}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate idea
              </>
            )}
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
