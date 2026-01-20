"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

interface ProjectProblemStatementProps {
  problemStatement: string;
  revealed: boolean;
}

export function ProjectProblemStatement({
  problemStatement,
  revealed,
}: ProjectProblemStatementProps) {
  return (
    <div
      className={`relative p-6 rounded-xl border border-primary/20 overflow-hidden transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Content */}
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            The Problem
          </h3>
        </div>

        <p className="text-base leading-relaxed text-foreground/90 max-w-2xl">
          {problemStatement}
        </p>

        {/* Visual indicator */}
        <div className="pt-2 flex items-center gap-2">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
          <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">
            Why this matters
          </span>
        </div>
      </div>
    </div>
  );
}
