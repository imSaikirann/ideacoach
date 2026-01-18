import { MessageSquare, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Answer Questions",
    description:
      "Tell us about your experience level, preferred tech stack, and what excites you.",
  },
  {
    icon: Sparkles,
    title: "Get Matched",
    description:
      "Our AI analyzes your profile and suggests projects perfectly suited to your skills.",
  },
  {
    icon: Rocket,
    title: "Start Building",
    description:
      "Receive a detailed project brief with resources, milestones, and learning goals.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="scroll-mt-20">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-sm font-medium text-foreground/80 mb-4">
          Simple Process
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get your personalized project recommendation in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="relative group">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-border to-transparent" />
            )}

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:border-border hover:shadow-lg hover:shadow-black/10">
              {/* Step number */}
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                Step {index + 1}
              </div>

              <div className="w-16 h-16 rounded-2xl bg-secondary/80 border border-border/50 flex items-center justify-center mb-5 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                <step.icon className="w-7 h-7 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
