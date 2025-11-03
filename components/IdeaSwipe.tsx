"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Lightbulb, Heart, X } from "lucide-react";

const fakeIdeas = [
  {
    id: 1,
    title: "AI Study Partner",
    description: "An AI that generates quizzes from your notes and helps you revise smarter.",
    tags: ["AI", "Education", "Productivity"],
  },
  {
    id: 2,
    title: "Campus Skill Swap",
    description: "A platform where students trade skills — coding for design, design for writing, etc.",
    tags: ["Community", "Learning", "Collaboration"],
  },
  {
    id: 3,
    title: "Mood-Based Music Player",
    description: "App that detects your mood using your camera and plays matching songs.",
    tags: ["AI", "Music", "Entertainment"],
  },
  {
    id: 4,
    title: "Mood-Based Music Player",
    description: "App that detects your mood using your camera and plays matching songs.",
    tags: ["AI", "Music", "Entertainment"],
  },
  {
    id: 5,
    title: "Mood-Based Music Player",
    description: "App that detects your mood using your camera and plays matching songs.",
    tags: ["AI", "Music", "Entertainment"],
  },
  {
    id: 6,
    title: "Mood-Based Music Player",
    description: "App that detects your mood using your camera and plays matching songs.",
    tags: ["AI", "Music", "Entertainment"],
  },
];

export default function IdeaSwipe() {
  const [ideas, setIdeas] = useState(fakeIdeas);

  const handleSwipe = (direction: "left" | "right") => {
    setIdeas((prev) => prev.slice(1)); // remove top card
  };

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <Lightbulb className="w-10 h-10 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold">No more ideas!</h2>
        <p className="text-sm text-gray-500">Check back later for fresh inspiration.</p>
      </div>
    );
  }

  const topIdea = ideas[0];
  const nextIdeas = ideas.slice(1);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  return (
    <div className="relative flex justify-center items-center h-[80vh] w-full overflow-hidden">
      {/* Render next cards (static) */}
      {nextIdeas.map((idea) => (
        <div
          key={idea.id}
          className="absolute w-80 sm:w-96 bg-gray-50 shadow-md rounded-2xl p-6 opacity-70 scale-95 border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-2">{idea.title}</h3>
          <p className="text-gray-600 text-sm">{idea.description}</p>
        </div>
      ))}

      {/* Top swipeable card */}
      <motion.div
        key={topIdea.id}
        className="absolute w-80 sm:w-96 bg-white shadow-xl rounded-2xl p-6 text-center cursor-grab border border-gray-200"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1.2}
        onDragEnd={(event, info) => {
          if (info.offset.x > 150) handleSwipe("right");
          else if (info.offset.x < -150) handleSwipe("left");
        }}
      >
        <h3 className="text-2xl font-bold mb-2">{topIdea.title}</h3>
        <p className="text-gray-600 mb-4">{topIdea.description}</p>
        <div className="flex justify-center flex-wrap gap-2">
          {topIdea.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="absolute bottom-12 flex gap-8">
        <button
          onClick={() => handleSwipe("left")}
          className="p-4 bg-red-100 hover:bg-red-200 rounded-full"
        >
          <X className="text-red-500 w-6 h-6" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="p-4 bg-green-100 hover:bg-green-200 rounded-full"
        >
          <Heart className="text-green-500 w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
