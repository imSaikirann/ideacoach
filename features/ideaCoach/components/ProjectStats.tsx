"use client";

import React from "react";
import { Target, Zap, BookOpen } from "lucide-react";

interface ProjectStatsProps {
  features: number;
  skills: number;
  revealed: boolean;
}

export function ProjectStats({
  features,
  skills,
  revealed,
}: ProjectStatsProps) {
  const stats = [
    {
      icon: Zap,
      label: "Key Features",
      value: features,
      color: "text-accent",
      bgColor: "bg-accent/5",
      borderColor: "border-accent/20",
    },
    {
      icon: BookOpen,
      label: "Skills to Learn",
      value: skills,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
    },
    {
      icon: Target,
      label: "Complexity Level",
      value: "Intermediate",
      isText: true,
      color: "text-foreground",
      bgColor: "bg-muted/30",
      borderColor: "border-border",
    },
  ];

  return (
    <div
      className={`transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "250ms" }}
    >
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${stat.bgColor} ${stat.borderColor} hover:border-opacity-40 transition-all duration-300 group`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.isText ? stat.value : stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
