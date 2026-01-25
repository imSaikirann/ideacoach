"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { ProjectProblemStatementProps } from "../types";



export function ProjectProblemStatement({
  problemStatement,
  revealed,
}: ProjectProblemStatementProps) {
  return (
    <div
      className={`relative p-6 sm:p-8 lg:p-10 rounded-xl border border-primary/20 overflow-hidden transition-all duration-700 mb-6 sm:mb-8 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Content */}
      <div className="relative space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide text-foreground">
            The Problem
          </h3>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
          {problemStatement}
        </p>

        {/* Visual indicator */}
        <div className="pt-2 sm:pt-3 flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
          <span className="text-xs sm:text-sm font-medium text-primary/70 uppercase tracking-wider">
            Why this matters
          </span>
        </div>
      </div>
    </div>
  );
}
