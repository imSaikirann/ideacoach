"use client";

import React from "react";
import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Target,
  Users,
  Award,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  level: "Foundation" | "Intermediate" | "Advanced";
  totalDuration: string;
  learners: number;
  icon: React.ReactNode;
  color: string;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Thinking in Problems, Not Features",
    description:
      "Learn how to identify real problems before jumping into solutions. This is the foundation of building products that people actually want to use.",
    lessons: [
      { id: 1, title: "Why Most Projects Fail", duration: "8 min read", completed: true },
      { id: 2, title: "The Problem-First Mindset", duration: "12 min read", completed: true },
      { id: 3, title: "Finding Problems Worth Solving", duration: "15 min read" },
      { id: 4, title: "Validating Your Problem Statement", duration: "10 min read" },
      { id: 5, title: "Exercise: Identify 5 Real Problems", duration: "20 min read" },
    ],
    level: "Foundation",
    totalDuration: "1h 5min read",
    learners: 2847,
    icon: <Target className="w-5 h-5" />,
    color: "chart-2",
  },
  {
    id: 2,
    title: "Breaking an Idea into an MVP",
    description:
      "Turn a big idea into a small, buildable first version. Learn to ruthlessly prioritize and ship something valuable fast.",
    lessons: [
      { id: 1, title: "What is an MVP (Really)?", duration: "10 min read" },
      { id: 2, title: "The Feature Prioritization Matrix", duration: "15 min read" },
      { id: 3, title: "Defining Your Core Loop", duration: "12 min read" },
      { id: 4, title: "Cutting Scope Without Killing Value", duration: "14 min read" },
      { id: 5, title: "MVP Case Studies", duration: "18 min read" },
      { id: 6, title: "Exercise: Plan Your MVP", duration: "25 min read" },
    ],
    level: "Foundation",
    totalDuration: "1h 34min read",
    learners: 2156,
    icon: <BookOpen className="w-5 h-5" />,
    color: "chart-3",
  },
  {
    id: 3,
    title: "Choosing the Right Tech Stack",
    description:
      "Avoid overengineering and pick tools that fit the project. Learn when to use what and why experienced developers make certain choices.",
    lessons: [
      { id: 1, title: "The Overengineering Trap", duration: "8 min read" },
      { id: 2, title: "Matching Stack to Project Size", duration: "14 min read" },
      { id: 3, title: "Database Decision Framework", duration: "16 min read" },
      { id: 4, title: "When to Use a Framework", duration: "12 min read" },
    ],
    level: "Intermediate",
    totalDuration: "50 min read",
    learners: 1893,
    icon: <GraduationCap className="w-5 h-5" />,
    color: "chart-4",
  },
  {
    id: 4,
    title: "Estimating Time & Scope",
    description:
      "Learn how long a project should really take — before you start. Stop underestimating and start delivering on time.",
    lessons: [
      { id: 1, title: "Why Developers Underestimate", duration: "10 min read" },
      { id: 2, title: "Breaking Down Tasks Properly", duration: "15 min read" },
      { id: 3, title: "Adding Buffer Time", duration: "8 min read" },
    ],
    level: "Intermediate",
    totalDuration: "33 min read",
    learners: 1654,
    icon: <Clock className="w-5 h-5" />,
    color: "primary",
  },
  {
    id: 5,
    title: "Building Projects That Impress Recruiters",
    description:
      "What makes a project portfolio-ready and interview-friendly. Learn to showcase your work in a way that gets you hired.",
    lessons: [
      { id: 1, title: "What Recruiters Actually Look For", duration: "12 min read" },
      { id: 2, title: "Documentation That Sells", duration: "14 min read" },
      { id: 3, title: "Creating a Project Demo", duration: "18 min read" },
      { id: 4, title: "Talking About Your Projects", duration: "15 min read" },
      { id: 5, title: "Portfolio Review Checklist", duration: "10 min read" },
    ],
    level: "Advanced",
    totalDuration: "1h 9min read",
    learners: 3421,
    icon: <Award className="w-5 h-5" />,
    color: "chart-5",
  },
];

const levelColors = {
  Foundation: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Intermediate: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function ProjectPlaybook() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  if (selectedModule) {
    return (
      <ModuleDetail
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="space-y-4 sm:space-y-6 text-center mb-10 sm:mb-14">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground/90">
            Learn to Build
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
            Project Playbook
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground leading-[1.1] tracking-tight">
            Think. Plan. Build. Ship.
          </p>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Learn how to think, plan, and build real projects — not just generate
          ideas. Free modules to level up your developer skills.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 pt-2">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">5</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Modules</p>
          </div>
          <div className="w-px h-10 bg-border/50" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">23</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Lessons</p>
          </div>
          <div className="w-px h-10 bg-border/50" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">5h+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Content</p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid gap-4 sm:gap-6">
        {modules.map((module, index) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module)}
            className="group w-full text-left rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6">
              {/* Module Number & Icon */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg sm:text-xl border border-primary/20">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  className={`hidden sm:flex flex-shrink-0 w-10 h-10 rounded-lg bg-${module.color}/10 items-center justify-center text-${module.color}`}
                >
                  {module.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${levelColors[module.level]}`}
                  >
                    {module.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {module.description}
                </p>
              </div>

              {/* Meta & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {module.lessons.length} lessons
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {module.totalDuration}
                  </span>
                  <span className="hidden md:flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {module.learners.toLocaleString()}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Progress Bar (if any lesson completed) */}
            {module.lessons.some((l) => l.completed) && (
              <div className="h-1 bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${(module.lessons.filter((l) => l.completed).length / module.lessons.length) * 100}%`,
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 sm:mt-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-base sm:text-lg font-semibold text-foreground">
            100% Free. No signup required.
          </span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Start learning now and build projects that matter.
        </p>
      </div>
    </section>
  );
}

function ModuleDetail({
  module,
  onBack,
}: {
  module: Module;
  onBack: () => void;
}) {
  const completedLessons = module.lessons.filter((l) => l.completed).length;
  const progress = (completedLessons / module.lessons.length) * 100;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all modules
      </button>

      {/* Module Header */}
      <div className="rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-xl bg-${module.color}/10 flex items-center justify-center text-${module.color} border border-${module.color}/20`}
          >
            {module.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${levelColors[module.level]}`}
              >
                {module.level}
              </span>
              <span className="text-xs text-muted-foreground">
                {module.lessons.length} lessons
              </span>
              <span className="text-xs text-muted-foreground">
                {module.totalDuration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {module.title}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {module.description}
            </p>

            {/* Progress */}
            {completedLessons > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your progress</span>
                  <span className="font-medium text-foreground">
                    {completedLessons}/{module.lessons.length} completed
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground">Chapters</h2>
        </div>

        <div className="divide-y divide-border/30">
          {module.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-4 p-4 sm:p-5 transition-colors ${
                lesson.locked
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-secondary/30 cursor-pointer"
              }`}
            >
              {/* Lesson Number/Status */}
              <div className="flex-shrink-0">
                {lesson.completed ? (
                  <div className="w-8 h-8 rounded-full bg-chart-2/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-chart-2" />
                  </div>
                ) : lesson.locked ? (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm border border-primary/20">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium ${lesson.completed ? "text-muted-foreground" : "text-foreground"}`}
                >
                  {lesson.title}
                </h3>
              </div>

              {/* Duration & Read */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <FileText className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                {!lesson.locked && (
                  <Button
                    size="sm"
                    variant={lesson.completed ? "outline" : "default"}
                    className={`h-8 px-3 gap-1.5 ${lesson.completed ? "bg-transparent" : ""}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {lesson.completed ? "Re-read" : "Read"}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <Button size="lg" className="h-12 px-8 text-base font-semibold gap-2">
          <BookOpen className="w-5 h-5" />
          {completedLessons > 0 ? "Continue Reading" : "Start Reading"}
        </Button>
      </div>
    </section>
  );
}
