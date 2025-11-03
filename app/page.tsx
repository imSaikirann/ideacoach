"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import Balancer from 'react-wrap-balancer'
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
      description:
        "Visualize income, expenses, and savings with interactive charts.",
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
  const [isLoading, setIsLoading] = useState(false);

  const handleNextIdea = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % projects.length);
      setIsLoading(false);
    }, 1500);
  };

  const project = projects[index];

  return (
    <>
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 py-24 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
        {/* === Subtle Grid Background === */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #a8a29e 1px, transparent 1px),
                linear-gradient(to bottom, #a8a29e 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Fading radial mask for smooth edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
        </div>

        {/* === LEFT SIDE === */}
        <motion.div
          className="max-w-4xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
           <Balancer>
             Don’t Know What to Build? <br />
            <span className="text-green-600">Let IdeaCoach Decide for You.</span>
           </Balancer>
          </h1>

          <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
           <Balancer>
             IdeaCoach helps college students pick the right project based on
            their skills, goals, and tech stack — so you can stop overthinking
            and start building.
           </Balancer>
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
                className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-6 flex items-center gap-2 hover:scale-105 transition-all"
              >
                Find My Project <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-200 px-8 py-6 hover:scale-105 transition-all"
              >
                See How It Works
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* === RIGHT SIDE === */}
        <motion.div
          className="relative w-full md:w-[480px] flex justify-center z-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 w-full max-w-lg"
            >
              <h3 className="text-lg md:text-2xl font-semibold mb-4 text-green-600 text-center">
                Your Project Suggestion 💡
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200">
                <p className="text-lg font-medium mb-2">{project.title}</p>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Level: {project.level}</span>
                  <span>Stack: {project.stack}</span>
                </div>
              </div>
              <Button
                onClick={handleNextIdea}
                disabled={isLoading}
                className="w-full bg-green-600 text-white hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" /> Generating...
                  </>
                ) : (
                  "Generate Another Idea"
                )}
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Soft Animated Glow */}
          <motion.div
            className="absolute -inset-10 bg-green-400/30 blur-3xl rounded-full -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* === HOW IT WORKS SECTION === */}
      <div id="how-it-works">
        <HowItWorks />
      </div>
    </>
  );
}
