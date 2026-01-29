'use client';

import { projectTypes } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Crown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectTypeStepProps } from "../types";
import { CreditsSkeleton } from "./CreditsSkeleton";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";


export function ProjectTypeStep({
  value,
  onChange,
  onNext,
  creditsLeft,
  creditsPerMonth,
  loading = false,
}: ProjectTypeStepProps) {
  const router = useRouter();
  const hasNoCredits = !loading && creditsLeft === 0;

  return (
    <StepLayout
      title="What do you want to build?"
      subtitle="Select the type of project you have in mind"
      currentStep={1}
      totalSteps={5}
      onBack={() => router.back()}
      footer={
        <div className="space-y-3">
          {/* Credits card */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/60 bg-secondary/40 px-4 py-3">
            
            {/* Left */}
            {loading ? (
              <CreditsSkeleton />
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <Coins className="h-4 w-4 text-accent" />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Monthly credits
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {creditsLeft}{" "}
                    <span className="text-muted-foreground">
                      / {creditsPerMonth}
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Right */}
            {!loading && hasNoCredits && (
              <Link
                href="/dashboard/upgrade-page"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                Upgrade plan
              </Link>
            )}
          </div>

          {/* Upgrade CTA */}
          {!loading && hasNoCredits && (
            <Link href="/dashboard/upgrade-page">
              <Button className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>
          )}

          {/* Continue */}
          {!hasNoCredits && <Button
            className="w-full h-12 font-medium"
            disabled={loading || !value || hasNoCredits}
            onClick={onNext}
          >
            {loading ? "Loading..." : "Continue"}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>}
        </div>
      }
    >
      {/* Project types */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {projectTypes.map((type) => (
          <motion.div key={type} variants={staggerItem}>
            <Chip
              active={value === type}
              onClick={() => !loading && onChange(type)}
            >
              {type}
            </Chip>
          </motion.div>
        ))}
      </motion.div>
    </StepLayout>
  );
}
