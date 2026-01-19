"use client";

import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";

interface CustomProblemStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  maxLength?: number;
  loading?: boolean;
}

export function CustomProblemStep({
  value,
  onChange,
  onBack,
  onGenerate,
  maxLength = 120,
  loading,
}: CustomProblemStepProps) {
  const isEmpty = value.trim().length === 0;

  return (
    <StepLayout
      title="Any specific problem in mind?"
      subtitle="Optional — skip if you’re not sure"
      currentStep={5}
      totalSteps={5}
      footer={
        <div className="flex gap-3">
          {/* Back */}
          <Button
            variant="outline"
            className="h-12 bg-transparent"
            onClick={onBack}
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Skip */}
          <Button
            variant="ghost"
            className="h-12"
            onClick={() => {
              if (!loading) {
                onChange("");
                onGenerate();
              }
            }}
            disabled={loading}
          >
            Skip
          </Button>

          {/* Generate */}
          <Button
            className="h-12 flex-1"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? (
              <>Generating...</>
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
      <div className="space-y-3">
        <Textarea
          value={value}
          onChange={(e) =>
            onChange(e.target.value.slice(0, maxLength))
          }
          placeholder="e.g. Security issues in user comment sections"
          className="min-h-[110px] resize-none"
        />

        <div className="text-xs text-muted-foreground text-right">
          {value.length} / {maxLength}
        </div>
      </div>
    </StepLayout>
  );
}
