"use client";

import React from "react";

interface ProjectSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  revealed: boolean;
}

export function ProjectSection({
  title,
  icon,
  children,
  delay = 0,
  revealed,
}: ProjectSectionProps) {
  return (
    <div
      className={`p-5 rounded-lg bg-card border border-border space-y-3 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <h3 className="text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
