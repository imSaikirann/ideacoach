"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { stacks, levels, interests } from "@/data/formData";

export default function IdeaForm() {
  const [step, setStep] = useState(1);

  // ✅ allow multiple tech stacks
  const [techStack, setTechStack] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");

  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fade = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
    transition: { duration: 0.25, ease: easeOut },
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const progress = (step / 3) * 100;

  // ✅ toggle selection of a tech stack
  const toggleTechStack = (stack: string) => {
    setTechStack((prev) =>
      prev.includes(stack)
        ? prev.filter((s) => s !== stack) // remove if already selected
        : [...prev, stack] // add if not selected
    );
  };

  const handleGenerate = async () => {
    if (!techStack.length || !difficulty || !interest) return;

    setLoading(true);
    setError(null);
    setIdea(null);

    try {
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // ✅ send as comma-separated string so your API route still works
          techStack: techStack.join(", "),
          difficulty,
          interest,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate idea");
      }

      const data = await res.json();
      setIdea(data.output);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="border border-gray-200 shadow-lg rounded-2xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Find Your Perfect Project 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-8" />

            <AnimatePresence mode="wait">
              {/* STEP 1 - Tech Stack (multi-select now) */}
              {step === 1 && (
                <motion.div key="step1" {...fade}>
                  <h3 className="text-lg mb-4 text-center text-gray-600">
                    Step 1: Choose Your Tech Stack
                  </h3>
                  <p className="text-xs text-center text-gray-500 mb-2">
                    You can pick multiple stacks (e.g. React + Node + PostgreSQL)
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto mb-8 pr-2">
                    {stacks.map((stack) => {
                      const isSelected = techStack.includes(stack);
                      return (
                        <Button
                          key={stack}
                          type="button"
                          onClick={() => toggleTechStack(stack)}
                          className={`py-3 rounded-xl text-sm ${
                            isSelected
                              ? "bg-green-500 text-white shadow-md hover:bg-green-400"
                              : "border border-gray-300 text-gray-800 hover:border-green-400 hover:text-green-600 bg-white"
                          }`}
                        >
                          {stack}
                        </Button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={techStack.length === 0} // ✅ must select at least one
                      className="bg-green-500 text-white hover:bg-green-400 disabled:opacity-50"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 - Difficulty */}
              {step === 2 && (
                <motion.div key="step2" {...fade}>
                  <h3 className="text-lg mb-4 text-center text-gray-600">
                    Step 2: Select Difficulty Level
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {levels.map((level) => (
                      <Button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`flex-1 py-4 rounded-xl ${
                          difficulty === level
                            ? "bg-green-500 text-white hover:bg-green-400"
                            : "border border-gray-300 text-gray-800 hover:border-green-400 hover:text-green-600 bg-white"
                        }`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300 text-gray-600"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!difficulty}
                      className="bg-green-500 text-white hover:bg-green-400 disabled:opacity-50"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 - Field / Interest */}
              {step === 3 && (
                <motion.div key="step3" {...fade}>
                  <h3 className="text-lg mb-4 text-center text-gray-600">
                    Step 3: Choose Your Interest Field
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {interests.map((item) => (
                      <Button
                        key={item}
                        type="button"
                        onClick={() => setInterest(item)}
                        className={`py-4 rounded-xl ${
                          interest === item
                            ? "bg-green-500 text-white hover:bg-green-400"
                            : "border border-gray-300 text-gray-800 hover:border-green-400 hover:text-green-600 bg-white"
                        }`}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-gray-300 text-gray-600"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleGenerate}
                        disabled={!interest || loading}
                        className="bg-green-500 text-white hover:bg-green-400 flex items-center gap-2 disabled:opacity-50"
                      >
                        {loading ? "Generating..." : "Generate Idea"}
                        {!loading && <Sparkles className="h-4 w-4" />}
                      </Button>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}

                    {idea && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl border border-green-100 bg-green-50/80 text-sm text-gray-800 whitespace-pre-line"
                      >
                        {idea}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
