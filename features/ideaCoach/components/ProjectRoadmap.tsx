"use client";

import React from "react";
import { CheckCircle2, ArrowDown } from "lucide-react";
import { ProjectRoadmapProps } from "../types";



export function ProjectRoadmap({ roadmap, revealed }: ProjectRoadmapProps) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-primary/10 space-y-4 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "900ms" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
          Build roadmap
        </h3>
      </div>

      <div className="space-y-3 pl-4">
        {roadmap.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector line */}
            {index < roadmap.length - 1 && (
              <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-transparent" />
            )}

            {/* Step item */}
            <div className="relative pl-6 pb-4">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
