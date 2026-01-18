
import HowItWorksItem from "./HowItWorksItem";
import { HOW_IT_WORKS_STEPS } from "./howItWorks.data";

export default function HowItWorks() {
  return (
    <div className="w-full bg-[#0F0E0E] border-t border-[#2A1F1F]">
  
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          {/* Header */}
          <div className="max-w-2xl space-y-4 mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E5E5] tracking-tight">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-[#A0A0A0] leading-relaxed">
              A simple process to turn your inputs into a build-ready project idea. Get started in minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <HowItWorksItem
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
 
    </div>
  );
}
