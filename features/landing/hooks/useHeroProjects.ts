
"use client";

import { Project } from "@/lib/schemas/project.schema";
import { useCallback, useState } from "react";

const projects: Project[] = [
  {
    title: "AI-Powered Task Tracker",
    oneLiner: "An intelligent task manager that prioritizes work for you.",
    problemSolved:
      "People waste time deciding what to do next instead of executing.",

    mustHaveFeatures: [
      "AI-based task prioritization",
      "Due-date & urgency scoring",
      "Manual override for full control",
    ],

    whyItFitsYou: [
      "Shows applied AI thinking",
      "Demonstrates real productivity pain",
      "Perfect for SaaS or startup interviews",
    ],

    upgradePaths: {
      beginner: ["Basic CRUD tasks", "Simple priority flags"],
      intermediate: ["ML-based scoring", "User behavior tracking"],
      advanced: ["LLM-based reasoning", "Team-level optimization"],
    },

    commonMistakes: [
      "Over-automating without user control",
      "Ignoring explainability of AI decisions",
    ],

    interviewAngle: {
      explain:
        "Explain how tasks are scored using urgency, deadlines, and past behavior.",
      tradeoffs: [
        "Automation vs user control",
        "Accuracy vs computation cost",
      ],
      improvements: [
        "Personalized models per user",
        "Feedback loop to retrain priorities",
      ],
    },

    firstThingsToGoogle: [
      "task prioritization algorithms",
      "LLM decision making patterns",
      "cron jobs vs event queues",
    ],
  },

  {
    title: "Personal Finance Dashboard",
    oneLiner: "A clean dashboard to track income, expenses, and savings.",
    problemSolved:
      "Most people have money data but no visibility into spending patterns.",

    mustHaveFeatures: [
      "Income vs expense breakdown",
      "Category-based analytics",
      "Monthly trends & insights",
    ],

    whyItFitsYou: [
      "Strong frontend + data visualization",
      "Real-world personal use case",
      "Easy to extend into fintech",
    ],

    upgradePaths: {
      beginner: ["Static charts", "Manual data entry"],
      intermediate: ["CSV import", "Category auto-tagging"],
      advanced: ["Bank API sync", "AI spending insights"],
    },

    commonMistakes: [
      "Too many charts without insight",
      "Ignoring mobile usability",
    ],

    interviewAngle: {
      explain:
        "Explain how raw transactions are transformed into meaningful insights.",
      tradeoffs: [
        "Real-time vs batch processing",
        "Accuracy vs simplicity",
      ],
      improvements: [
        "Predictive monthly spending",
        "Goal-based saving recommendations",
      ],
    },

    firstThingsToGoogle: [
      "data visualization best practices",
      "financial categorization logic",
      "chart performance optimization",
    ],
  },
];

export function useHeroProjects() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const project = projects[index];

  const next = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    // animation window
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 300);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  return {
    project,
    index,
    total: projects.length,
    next,
    isAnimating,
  };
}