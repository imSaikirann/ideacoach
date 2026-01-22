'use client';

import { projectTypes } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Crown } from "lucide-react";
import { ProjectTypeStepProps } from "../types";
import Link from "next/link";


export function ProjectTypeStep({ value, onChange, onNext, creditsLeft = 0, creditsPerMonth = 0 }: ProjectTypeStepProps) {
  const hasNoCredits = creditsLeft === 0;

  return (
    <StepLayout
      title="What do you want to build?"
      subtitle="Select the type of project you have in mind"
      currentStep={1}
      totalSteps={5}
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

            {hasNoCredits && (
              <Link href="/upgrade" className="text-xs font-medium text-destructive hover:underline">
                Upgrade to continue
              </Link>
            )}
          </div>

          {/* Upgrade button if no credits */}
          {hasNoCredits && (
            <Link href="/upgrade" className="block">
              <Button className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>
          )}

          {/* Continue button */}
          <Button
            className="w-full h-12 font-medium"
            disabled={!value || hasNoCredits}
            onClick={onNext}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
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
