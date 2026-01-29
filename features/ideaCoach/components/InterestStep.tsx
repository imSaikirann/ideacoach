"use client";

import { developerInterests, interests } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { InterestStepProps } from "../types";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";


export function InterestStep({
  value,
  onChange,
  onBack,
  onNext,
  projectType,
}: InterestStepProps) {
  // Prefer interests for the chosen projectType; fall back to the full list
  const interestOptions =
    projectType && projectType in interests
      ? interests[projectType as keyof typeof interests]
      : developerInterests;

  return (
    <StepLayout
      title="What field interests you?"
      subtitle="Choose a domain for your project"
      currentStep={4}
      totalSteps={5}
      onBack={onBack}
      footer={
        <div className="flex gap-3">
          {/* Continue */}
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
        className="flex flex-wrap gap-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {interestOptions.map((interest) => (
          <motion.div key={interest} variants={staggerItem}>
            <Chip
              active={value === interest}
              onClick={() => onChange(interest)}
            >
              {interest}
            </Chip>
          </motion.div>
        ))}
      </motion.div>
    </StepLayout>
  );
}
