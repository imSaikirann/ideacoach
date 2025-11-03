"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  level: string;
  stack: string;
}

export default function Hero() {
  const projects: Project[] = [
    {
      title: "AI-Powered Task Tracker",
      description: "A productivity app that uses AI to auto-prioritize tasks.",
      level: "Intermediate",
      stack: "React + Node.js",
    },
    {
      title: "Personal Finance Dashboard",
      description: "Visualize income, expenses, and savings with interactive charts.",
      level: "Beginner",
      stack: "Next.js + Tailwind",
    },
    {
      title: "Real-Time Chat App",
      description: "A full-stack chat app with live presence and message storage.",
      level: "Advanced",
      stack: "React + Socket.io + MongoDB",
    },
    {
      title: "AI Resume Analyzer",
      description: "Upload resumes and get keyword optimization insights using AI.",
      level: "Intermediate",
      stack: "Next.js + OpenAI API",
    },
  ];

  const [index, setIndex] = useState(0);
  const handleNextIdea = () => setIndex((prev) => (prev + 1) % projects.length);

  const project = projects[index];

  return (
   <>
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* LEFT SIDE */}
      <motion.div
        className="max-w-2xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-mono md:text-6xl font-bold leading-tight mb-6">
          Don’t Know What to Build? <br />
          <span className="text-green-400">Let IdeaCoach Decide for You.</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          IdeaCoach helps you pick the right project based on your skills, goals, and tech stack — 
          so you can stop wasting time thinking and start learning by doing.
        </p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/idea-form">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-6 flex items-center gap-2 hover:scale-105 transition-all"
            >
              Find My Project <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 text-black hover:bg-gray-800 px-8 py-6 hover:scale-105 transition-all"
          >
            See How It Works
          </Button>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE - PROJECT CARD */}
      <motion.div
        className="relative w-full md:w-[480px] flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400 text-center">
              Your Project Suggestion 💡
            </h3>
            <div className="bg-gray-800/60 rounded-xl p-4 mb-5 border border-gray-700">
              <p className="text-lg font-medium mb-2">{project.title}</p>
              <p className="text-gray-400 text-sm mb-3">{project.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Level: {project.level}</span>
                <span>Stack: {project.stack}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={handleNextIdea}
              className="w-full bg-green-600/20 text-green-300 hover:bg-green-600/30 transition-colors cursor-pointer"
            >
              Generate Another Idea
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Animated Glow */}
        <motion.div
          className="absolute -inset-10 bg-green-500/20 blur-3xl rounded-full -z-10"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </section>
    <HowItWorks/>
   </>
  );
}
