"use client";

import { Check, X, Sparkles, Zap } from "lucide-react";

const comparisons = [
  {
    feature: "Personalized Ideas",
    others: "Gives the same recycled ideas to everyone",
    ideacoach: "Generates ideas tailored to your skills and interests",
  },
  {
    feature: "Clarity on What to Build",
    others: "Leaves you confused about where to start",
    ideacoach: "Gives you a clear, buildable direction",
  },
  {
    feature: "Skill-Level Matching",
    others: "Suggests ideas that are too basic or too complex",
    ideacoach: "Matches ideas to your current experience level",
  },
  {
    feature: "Problem Selection",
    others: "Suggests random or unrealistic problems",
    ideacoach: "Focuses on real-world problems worth solving",
  },
  {
    feature: "Tech Stack Relevance",
    others: "Ignores the tools you actually use",
    ideacoach: "Aligns ideas with your preferred tech stack",
  },
  {
    feature: "Guided Thinking",
    others: "One prompt, one shallow response",
    ideacoach: "Guides you step by step like a mentor",
  },
  {
    feature: "Actionability",
    others: "Sounds interesting but hard to execute",
    ideacoach: "Ideas you can start building immediately",
  },
  {
    feature: "Learning & Growth",
    others: "No improvement in your thinking",
    ideacoach: "Helps you think like a better developer",
  },
];

export default function Compare() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16">
        {/* Badge with animation */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground/90">
            Why choose IdeaCoach
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
            IdeaCoach vs Other Generators
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground leading-[1.1] tracking-tight">
            Built different. Built for developers.
          </p>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2">
          Not all idea generators are created equal. Here&apos;s how IdeaCoach
          stands apart from the rest.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-2xl border border-border/50 bg-secondary/20 backdrop-blur-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-5 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-1/4">
                Feature
              </th>
              <th className="text-left p-5 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-[37.5%]">
                Others
              </th>
              <th className="text-left p-5 text-sm font-semibold text-foreground uppercase tracking-wider bg-primary/5 w-[37.5%]">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  IdeaCoach
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, index) => (
              <tr
                key={item.feature}
                className={`border-b border-border/30 last:border-b-0 transition-colors hover:bg-secondary/30 ${
                  index % 2 === 0 ? "bg-transparent" : "bg-secondary/10"
                }`}
              >
                <td className="p-5">
                  <span className="font-semibold text-foreground">
                    {item.feature}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {item.others}
                    </span>
                  </div>
                </td>
                <td className="p-5 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-chart-2/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-chart-2" />
                    </div>
                    <span className="text-foreground font-medium text-sm">
                      {item.ideacoach}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {/* Column Labels */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <X className="w-4 h-4 text-destructive" />
            <span>Others</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>IdeaCoach</span>
          </div>
        </div>

        {comparisons.map((item) => (
          <div
            key={item.feature}
            className="rounded-xl border border-border/50 bg-secondary/20 backdrop-blur-sm overflow-hidden"
          >
            {/* Feature Header */}
            <div className="px-4 py-3 border-b border-border/30 bg-secondary/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm sm:text-base">
                  {item.feature}
                </span>
              </div>
            </div>

            {/* Comparison Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Others */}
              <div className="p-4 border-b sm:border-b-0 sm:border-r border-border/30">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {item.others}
                  </span>
                </div>
              </div>

              {/* IdeaCoach */}
              <div className="p-4 bg-primary/5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-chart-2/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-chart-2" />
                  </div>
                  <span className="text-foreground font-medium text-sm leading-relaxed">
                    {item.ideacoach}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing Statement */}
      <div className="mt-12 sm:mt-16 text-center space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="text-base sm:text-lg font-semibold text-foreground">
            Ideas are easy.{" "}
            <span className="text-chart-2">The right idea isn&apos;t.</span>
          </span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          IdeaCoach helps you find ideas you can actually build.
        </p>
      </div>
    </section>
  );
}
