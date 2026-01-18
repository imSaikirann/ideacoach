// components/hero/useHeroProjects.ts
"use client";

import { useState } from "react";

const projects = [
  {
    title: "AI-Powered Task Tracker",
    description: "A productivity app that uses AI to auto-prioritize tasks.",
    level: "Intermediate",
    stack: "React + Node.js",
  },
  {
    title: "Personal Finance Dashboard",
    description: "Visualize income, expenses, and savings with charts.",
    level: "Beginner",
    stack: "Next.js + Tailwind",
  },
];

export function useHeroProjects() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % projects.length);
      setLoading(false);
    }, 1200);
  };

  return {
    project: projects[index],
    next,
    loading,
  };
}
