"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export default function HeroContent() {
  return (
    <motion.div
      className="mx-auto max-w-xl space-y-10 text-center lg:mx-0 lg:text-left"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div
        className="flex justify-center lg:justify-start"
        variants={staggerItem}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium tracking-wide">
            AI-powered project discovery for developers
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div className="space-y-4" variants={staggerItem}>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl">
          Build portfolio projects that
          <span className="text-primary"> get noticed</span>
        </h1>

        <p className="text-lg font-medium text-muted-foreground sm:text-xl">
          Stop overthinking ideas. Get clear, real-world project plans tailored
          to your skills.
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground lg:mx-0"
        variants={staggerItem}
      >
        IdeaCoach generates high-signal project ideas with scope, features, and
        real-world relevance  so you always know what to build next and why it
        matters.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
        variants={staggerItem}
      >
        <Link href="/dashboard/idea-form">
          <Button size="lg" className="group w-full sm:w-auto">
            Generate my project
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="/dashboard/public-ideas">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Browse real ideas
          </Button>
        </Link>
      </motion.div>

      {/* Trust */}
      <motion.div
        className="flex items-center justify-center gap-4 pt-2 lg:justify-start"
        variants={staggerItem}
      >
        <div className="flex -space-x-3">
          {["JS", "TS", "FE", "BE"].map((label) => (
            <div
              key={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-semibold text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-semibold text-foreground">
            2,000+ developers
          </span>{" "}
          building real-world projects
        </p>
      </motion.div>
    </motion.div>
  );
}
