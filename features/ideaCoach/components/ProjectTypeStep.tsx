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
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/60 bg-secondary/40 px-4 py-3">
  {/* Credits Info */}
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
      <Coins className="h-4 w-4 text-accent" />
    </div>

    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">
        Monthly credits
      </span>
      <span className="text-sm font-medium text-foreground">
        {creditsLeft} <span className="text-muted-foreground">/ {creditsPerMonth}</span>
      </span>
    </div>
  </div>

  {/* CTA */}
  {hasNoCredits && (
    <Link
      href="/upgrade"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline sm:self-center"
    >
      Upgrade plan
     
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
          {!hasNoCredits && <Button
            className="w-full h-12 font-medium"
            disabled={!value || hasNoCredits}
            onClick={onNext}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>}
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
