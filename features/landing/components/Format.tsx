"use client";

import { Clock, Lightbulb, Code, ListChecks, GraduationCap, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportFadeInUp } from "@/lib/animations";

export default function Format() {
  return (
    <motion.section
      className="max-w-5xl mx-auto px-6 py-20"
      variants={viewportFadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Header - matching hero style */}
      <div className="space-y-6 text-center mb-16">
        {/* Badge with animation */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground/90">
            Sample output
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
            Example IdeaCoach Response
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-muted-foreground leading-[1.1] tracking-tight">
            Structured. Clear. Build-ready.
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Every response is formatted like a clean markdown document — easy to read, easy to follow, easy to build.
        </p>
      </div>

      {/* Markdown-style Card */}
      <motion.div
        className="rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm overflow-hidden"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {/* Card Header - like a code editor tab */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border/50 bg-secondary/30">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">project-idea.md</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-chart-4/60" />
            <div className="w-3 h-3 rounded-full bg-chart-2/60" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-chart-4" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project Title</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Study Progress Tracker
            </h3>
          </div>

          <hr className="border-border/40" />

          {/* Problem Statement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">?</span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Problem Statement</span>
            </div>
            <p className="text-foreground/90 leading-relaxed pl-10">
              Many students struggle to stay consistent with studying because they lack a simple way to track daily progress and visualize improvement over time.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <ListChecks className="w-4 h-4 text-chart-2" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Features</span>
            </div>
            <ul className="space-y-2 pl-10">
              {[
                "Log daily study sessions",
                "Weekly and monthly progress charts",
                "Streak tracking for consistency",
                "Basic reminders and notifications",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-chart-2/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What You'll Learn */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-chart-1" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What You&apos;ll Learn</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pl-10">
              {[
                "React state management",
                "CRUD operations with backend APIs",
                "Data visualization fundamentals",
                "Designing habit-forming UX",
              ].map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30"
                >
                  <Code className="w-4 h-4 text-chart-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Estimate */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estimated Time</span>
              <p className="text-foreground font-semibold text-lg">
                5–7 days <span className="text-muted-foreground font-normal text-base">(2–3 hours per day)</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

    
    </motion.section>
  );
}
