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
      className="mx-auto max-w-xl space-y-8 text-center lg:mx-0 lg:max-w-2xl lg:text-left"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div
        className="flex justify-center lg:justify-start"
        variants={staggerItem}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            AI-powered project discovery
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div className="space-y-5" variants={staggerItem}>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
          Build portfolio projects
          <br />
          that{" "}
          <span className="text-primary relative inline-block">
            get you noticed
            <svg
              aria-hidden
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6 Q75 2 150 5 Q225 8 298 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-primary opacity-50"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg lg:mx-0 leading-relaxed">
          Stop overthinking ideas. Get clear, real-world project plans tailored
          to your skills — so you always know what to build next.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-center lg:justify-start"
        variants={staggerItem}
      >
        <Link href="/dashboard/idea-form">
          <Button size="lg" className="group w-full sm:w-auto gap-2 font-semibold">
            Generate my project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="/dashboard/public-ideas">
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
            <Sparkles className="h-4 w-4" />
            Browse ideas
          </Button>
        </Link>
      </motion.div>

      {/* Trust */}
      {/* <motion.div
        className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-center lg:justify-start"
        variants={staggerItem}
      >
        <div className="flex -space-x-2.5">
          {["JS", "TS", "FE", "BE"].map((label) => (
            <div
              key={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-semibold text-foreground">2,000+ developers</span>
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3.5 w-3.5 fill-yellow-400" viewBox="0 0 12 12">
                <path d="M6 1l1.4 2.8 3.1.5-2.3 2.1.5 3.1L6 8l-2.7 1.5.5-3.1L1.5 4.3l3.1-.5z" />
              </svg>
            ))}
            <span className="text-xs text-muted-foreground ml-1">4.9 / 5</span>
          </div>
        </div>
      </motion.div> */}
    </motion.div>
  );
}