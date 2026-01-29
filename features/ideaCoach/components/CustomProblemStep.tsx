"use client";

import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Coins } from "lucide-react";
import { CustomProblemStepProps } from "../types";

export function CustomProblemStep({
  value,
  onChange,
  onBack,
  onGenerate,
  maxLength = 200,
  loading,
  creditsLeft = 0,
  creditsPerMonth = 0,
}: CustomProblemStepProps) {
  const isEmpty = value.trim().length === 0;

  return (
    <StepLayout
      title="Any specific problem in mind?"
      subtitle="Optional — skip if you're not sure, or add your idea here"
      currentStep={5}
      totalSteps={5}
      onBack={onBack}
      footer={
        <div className="space-y-3">
          {/* Credits info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 sm:px-4 py-2.5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="h-4 w-4 flex-shrink-0" />
              <span>
                Credits:{" "}
                <span className="font-medium text-foreground">
                  {creditsLeft}
                </span>{" "}
                / {creditsPerMonth}
              </span>
            </div>

            {creditsLeft === 0 && (
              <span className="text-xs font-medium text-destructive">
                No credits left
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Skip */}
            <Button
              variant="outline"
              className="h-12 flex-1 bg-transparent"
              onClick={onGenerate}
              disabled={loading || creditsLeft === 0}
            >
              Skip
            </Button>

            {/* Generate */}
            <Button
              className="h-12 flex-1"
              onClick={onGenerate}
              disabled={loading || creditsLeft === 0}
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Idea
                </>
              )}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) =>
            onChange(e.target.value.slice(0, maxLength))
          }
          placeholder="e.g. Security issues in user comment sections, or describe a problem you want to solve..."
          className="min-h-[140px] resize-none text-base sm:text-sm"
          disabled={loading}
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="text-muted-foreground/70">
            {isEmpty ? "Leave empty to skip" : "Your custom problem or idea"}
          </span>
          <span>
            {value.length} / {maxLength}
          </span>
        </div>
      </div>
    </StepLayout>
  );
}
