"use client";

import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, fadeIn } from "@/lib/animations";

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
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-accent text-accent-foreground ring-4 ring-accent/20"
                      : isCompleted
                        ? "bg-accent/80 text-accent-foreground"
                        : "bg-secondary text-muted-foreground"
                  }
                `}
                variants={scaleIn}
                initial="hidden"
                animate={isActive || isCompleted ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="number"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      {stepNumber}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {index < totalSteps - 1 && (
              <div className="flex-1 h-px mx-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-border" />
                <motion.div
                  className="absolute inset-0 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
