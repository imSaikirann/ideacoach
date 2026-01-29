"use client";

import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-accent text-accent-foreground ring-4 ring-accent/20"
                      : isCompleted
                        ? "bg-accent/80 text-accent-foreground"
                        : "bg-secondary text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
            </div>

            {index < totalSteps - 1 && (
              <div className="flex-1 h-px mx-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-border" />
                <div
                  className={`absolute inset-0 bg-accent transition-transform duration-200 origin-left ${
                    isCompleted ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
