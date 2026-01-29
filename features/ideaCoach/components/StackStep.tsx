'use client';

import { stacksByType } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StackStepProps } from "../types";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";



export function StackStep({
  projectType,
  value,
  onChange,
  onBack,
  onNext,
}: StackStepProps) {
  const stacksList = projectType && stacksByType[projectType as keyof typeof stacksByType] ? stacksByType[projectType as keyof typeof stacksByType] : [];

  const toggleStack = (stack: string) => {
    onChange(
      value.includes(stack) ? value.filter((s) => s !== stack) : [...value, stack]
    );
  };

  return (
    <StepLayout
      title="Pick your tech stack"
      subtitle={`Select one or more technologies for your ${projectType.toLowerCase()}`}
      currentStep={2}
      totalSteps={5}
      onBack={onBack}
      footer={
        <div className="flex gap-3">
          <Button
            className="h-12 flex-1"
            disabled={!value.length}
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
        {stacksList.map((stack, index) => (
          <motion.div key={stack} variants={staggerItem}>
            <Chip
              active={value.includes(stack)}
              onClick={() => toggleStack(stack)}
            >
              {stack}
            </Chip>
          </motion.div>
        ))}
      </motion.div>
    </StepLayout>
  );
}
