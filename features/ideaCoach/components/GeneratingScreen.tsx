"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { generationMessages } from "../constants";

interface GeneratingScreenProps {
  isGenerating: boolean;
}

export function GeneratingScreen({ isGenerating }: GeneratingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentMessageIndex(0);
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    const message = generationMessages[currentMessageIndex];
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    // Type out the message character by character
    const typeInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayedText(message.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        // Move to next message after a delay
        setTimeout(() => {
          if (currentMessageIndex < generationMessages.length - 1) {
            setCurrentMessageIndex((prev) => prev + 1);
          } else {
            // Loop back to first message
            setCurrentMessageIndex(0);
          }
        }, 2000);
      }
    }, 50); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-12">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent blur-2xl animate-pulse" style={{ animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1)" }} />
            
            {/* Main circle */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-primary animate-spin" style={{ animationDuration: "4s" }} />
            </div>
          </div>
        </div>

        {/* Message Display */}
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              Generating your project
            </h2>
            
            {/* Dynamic message display */}
            <div className="min-h-[80px] flex items-center justify-center">
              <div className="relative w-full">
                <p className="text-lg sm:text-xl text-primary font-medium tracking-wide transition-all duration-300">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" style={{ animation: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1)" }} />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-3">
            {generationMessages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  index < currentMessageIndex
                    ? "bg-primary w-8 opacity-100"
                    : index === currentMessageIndex
                    ? "bg-primary w-8 opacity-100"
                    : "bg-muted w-2 opacity-50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Subtle accent line */}
        <div className="w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />
      </div>
    </div>
  );
}
