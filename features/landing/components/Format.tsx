"use client";

import {
  Lightbulb,
  ListChecks,
  GraduationCap,
  Clock,
  Code,
  AlertTriangle,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { useHeroProjects } from "../hooks/useHeroProjects";
import { cn } from "@/lib/utils";

export default function ProjectFormat() {
  const { project, isAnimating } = useHeroProjects();

  return (
    <motion.section
      className="mx-auto max-w-5xl px-6 py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            Live generated output
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          How your project is structured
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every idea is delivered like a clean, build-ready document — not a chat reply.
        </p>
      </div>

      {/* Markdown-style card */}
      <motion.div
        className={cn(
          "rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm",
          "transition-all duration-500",
          isAnimating && "opacity-50"
        )}
      >
        {/* Header (file style) */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-6 py-4">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.md
          </span>
        </div>

        {/* Content */}
        <div className="space-y-10 p-6 sm:p-8">
          {/* Title */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Project
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {project.title}
            </h3>
            <p className="text-muted-foreground">
              {project.oneLiner}
            </p>
          </section>

          <hr className="border-border/40" />

          {/* Problem */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive/80" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Problem it solves
              </span>
            </div>
            <p className="leading-relaxed text-foreground/90">
              {project.problemSolved}
            </p>
          </section>

          {/* Features */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-chart-2" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Must-have features
              </span>
            </div>

            <ul className="space-y-2 pl-1">
              {project.mustHaveFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Learning outcomes */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-chart-1" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Why this project fits you
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.whyItFitsYou.map((reason) => (
                <span
                  key={reason}
                  className="rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm"
                >
                  {reason}
                </span>
              ))}
            </div>
          </section>

          {/* Google first */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                First things to google
              </span>
            </div>

            <ul className="space-y-1 pl-1 text-sm text-muted-foreground">
              {project.firstThingsToGoogle.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* Time estimate (derived, not stored) */}
          <section className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4">
            <Clock className="h-6 w-6 text-accent" />
            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Estimated effort
              </p>
              <p className="font-medium">
                5–7 days · 2–3 hours/day
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.section>
  );
}
