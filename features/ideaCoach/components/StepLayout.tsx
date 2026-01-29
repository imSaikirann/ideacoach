"use client"

import React from "react"
import { ArrowLeft } from "lucide-react";
import { StepProgress } from "./StepProgress";

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
}

export function StepLayout({
  title,
  subtitle,
  children,
  footer,
  currentStep,
  totalSteps,
  onBack,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {onBack && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {typeof currentStep === "number" && typeof totalSteps === "number" && (
          <div>
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        <div className="mt-8 sm:mt-12 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          {children}
        </div>

        {footer && (
          <div className="mt-8 sm:mt-10 pt-6 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
