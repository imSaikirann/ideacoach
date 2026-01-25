"use client";

import React from "react"
import { StepProgress } from "./StepProgress";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export function StepLayout({
  title,
  subtitle,
  children,
  footer,
  currentStep,
  totalSteps,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {typeof currentStep === "number" && typeof totalSteps === "number" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          </motion.div>
        )}

        <motion.div
          className="mt-8 sm:mt-12 space-y-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <motion.p
              className="text-sm sm:text-base text-muted-foreground"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>

        {footer && (
          <motion.div
            className="mt-8 sm:mt-10 pt-6 border-t border-border"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {footer}
          </motion.div>
        )}
      </div>
    </div>
  );
}
