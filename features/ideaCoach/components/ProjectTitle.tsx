"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { ProjectTitleProps } from "../types";



export function ProjectTitle({
  title,
  subtitle,
  revealed,
}: ProjectTitleProps) {
  return (
    <div
      className={`transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 text-accent mb-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Your project idea
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
