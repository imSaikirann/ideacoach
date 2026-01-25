import React from "react"
import { StepProgress } from "./StepProgress";

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export function StepLayout({
  title,
  subtitle,
  children,
  footer,
  header,
  currentStep,
  totalSteps,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6 py-8 sm:py-12">
        {typeof currentStep === "number" && typeof totalSteps === "number" && (
          <div className="mb-8 sm:mb-10">
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        {header && <div className="mb-4">{header}</div>}

        {title && (
          <div className="mb-8 sm:mb-10 lg:mb-12 space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight text-balance leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">{children}</div>

        {footer && (
          <div className="mt-10 sm:mt-12 lg:mt-16 pt-8 sm:pt-10 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
