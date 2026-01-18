export function StepProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-2 px-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={index} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#541212] text-white"
                    : isCompleted
                    ? "bg-[#2A1F1F] text-[#A0A0A0]"
                    : "bg-[#1A1818] text-[#6B6B6B]"
                }`}
              >
                {isCompleted ? (
                  <span className="text-lg sm:text-xl">✓</span>
                ) : (
                  stepNumber
                )}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-8 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-[#541212]" : "bg-[#2A1F1F]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

