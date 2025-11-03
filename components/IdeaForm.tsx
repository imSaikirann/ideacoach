"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {stacks,levels,interests} from "@/data/formData"
export default function IdeaForm() {
  const [step, setStep] = useState(1);
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [interest, setInterest] = useState("");

 

  const fade = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
    transition: { duration: 0.25, ease: easeOut },
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const progress = (step / 3) * 100;

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
              {/* STEP 1 - Tech Stack */}
              {step === 1 && (
                <motion.div key="step1" {...fade}>
                  <h3 className="text-lg mb-4 text-center text-gray-600">
                    Step 1: Choose Your Tech Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto mb-8 pr-2">
                    {stacks.map((stack) => (
                      <Button
                        key={stack}
                        onClick={() => setTechStack(stack)}
                        className={`py-3 rounded-xl text-sm ${
                          techStack === stack
                            ? "bg-green-500 text-white shadow-md hover:bg-green-400"
                            : "border border-gray-300 text-white hover:border-green-400 hover:text-green-600"
                        }`}
                      >
                        {stack}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={nextStep}
                      disabled={!techStack}
                      className="bg-green-500 text-white hover:bg-green-400"
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
                        onClick={() => setDifficulty(level)}
                        className={`flex-1 py-4 rounded-xl ${
                          difficulty === level
                            ? "bg-green-500 text-white hover:bg-green-400"
                            : "border border-gray-300 text-white hover:border-green-400 hover:text-green-600"
                        }`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300 text-gray-600"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!difficulty}
                      className="bg-green-500 text-white hover:bg-green-400"
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
                        onClick={() => setInterest(item)}
                        className={`py-4 rounded-xl ${
                          interest === item
                            ? "bg-green-500 text-white hover:bg-green-400"
                            : "border border-gray-300 text-white hover:border-green-400 hover:text-green-600"
                        }`}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300 text-gray-600"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      disabled={!interest}
                      className="bg-green-500 text-white hover:bg-green-400 flex items-center gap-2"
                    >
                      Generate Idea <Sparkles className="h-4 w-4" />
                    </Button>
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
