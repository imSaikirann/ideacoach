import { StepProgress } from "./StepProgress";

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

export function StepLayout({
  title,
  subtitle,
  children,
  footer,
  currentStep,
  totalSteps,
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F0E0E]">
      <div
        className="
          mx-auto
          w-full
          max-w-4xl
          px-4
          sm:px-6
          md:px-8
          py-10
          sm:py-12
          md:py-16
          lg:py-20
        "
      >
        {/* Progress */}
        {typeof currentStep === "number" &&
          typeof totalSteps === "number" && (
            <StepProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )}

        {/* Header */}
        <div className="mt-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E5E5E5] tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-[#A0A0A0]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="mt-10 space-y-6 sm:space-y-8">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-12 pt-6 border-t border-[#2A1F1F]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
