"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex flex-col h-screen md:flex-row items-center justify-between gap-12 px-6 md:px-20 py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Left Text Section */}
      <div className="max-w-2xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Don’t Know What to Build? <br />
          <span className="text-green-400">Let IdeaCoach Decide for You.</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Stop wasting days scrolling through “project ideas” threads.
          Tell IdeaCoach your skills — get smart, build-ready projects
          designed to level you up.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-6 flex items-center gap-2"
          >
            Find My Project <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6"
          >
            See How It Works
          </Button>
        </div>
      </div>

      {/* Right Visual Section */}
      <div className="relative w-full md:w-[480px]">
        <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fade-in">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Your Project Suggestion 💡
          </h3>
          <div className="bg-gray-800/60 rounded-xl p-4 mb-4 border border-gray-700">
            <p className="text-lg font-medium mb-2">AI-Powered Task Tracker</p>
            <p className="text-gray-400 text-sm mb-2">
              Build a productivity app that uses AI to auto-prioritize tasks.
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Level: Intermediate</span>
              <span>Stack: React + Node.js</span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full bg-green-600/20 text-green-300 hover:bg-green-600/30 mt-2"
          >
            Generate Another Idea
          </Button>
        </div>

        {/* Gradient Glow Effect */}
        <div className="absolute -inset-10 bg-green-500/20 blur-3xl rounded-full animate-pulse -z-10"></div>
      </div>
    </section>
  );
}
