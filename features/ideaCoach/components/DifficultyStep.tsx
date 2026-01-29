'use client';

import { levels } from "../constants";
import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Flame, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { DifficultyStepProps } from "../types";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";


const levelConfig = {
  Beginner: {
    icon: Zap,
    description: "Simple concepts, quick to build",
  },
  Intermediate: {
    icon: Flame,
    description: "More features, moderate complexity",
  },
  Advanced: {
    icon: Rocket,
    description: "Complex architecture, full-stack",
  },
};

export function DifficultyStep({
  value,
  onChange,
  onBack,
  onNext,
}: DifficultyStepProps) {
  return (
    <StepLayout
      title="How challenging should it be?"
      subtitle="Choose a difficulty level that matches your skills"
      currentStep={3}
      totalSteps={5}
      onBack={onBack}
      footer={
        <div className="flex gap-3">
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
      <motion.div
        className="grid gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {levels.map((level, index) => {
          const config = levelConfig[level as keyof typeof levelConfig];
          const Icon = config.icon;
          const isActive = value === level;

          return (
            <motion.button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              variants={staggerItem}
              className={cn(
                "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border text-left transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "min-h-[72px] touch-manipulation cursor-pointer",
                isActive
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-border bg-secondary/50 hover:border-accent/50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0",
                  isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm sm:text-base">{level}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{config.description}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </StepLayout>
  );
}
