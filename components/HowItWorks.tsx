"use client";

import { motion } from "framer-motion";
import { Lightbulb, Brain, Rocket, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Tell Us Your Skills",
    description: "Pick your current stack or experience level — no guessing needed.",
  },
  {
    icon: Brain,
    title: "Get Smart Project Suggestions",
    description:
      "IdeaCoach matches you with projects that fit your level and goals.",
  },
  {
    icon: ClipboardCheck,
    title: "Receive a Step-by-Step Roadmap",
    description:
      "Each idea comes with guidance and resources so you can actually start building.",
  },
  {
    icon: Rocket,
    title: "Start Building, Not Overthinking",
    description:
      "No more idea paralysis — start coding something real today.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-gradient-to-b from-foreground to-accent text-background py-24 px-6 md:px-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How <span className="text-primary">IdeaCoach</span> Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Turn your skills into real projects in just a few simple steps — designed to eliminate overthinking.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-card/60 border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-all group"
          >
            <div className="flex justify-center mb-5">
              <step.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Subtle Glow Background */}
      <motion.div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-3xl rounded-full -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </section>
  );
}
