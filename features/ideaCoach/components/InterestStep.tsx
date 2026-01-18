import { interests } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";

interface InterestStepProps {
  value?: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  loading?: boolean;
}

export function InterestStep({
  value,
  onChange,
  onBack,
  onGenerate,
  loading,
}: InterestStepProps) {
  return (
    <StepLayout
      title="Choose your field"
      subtitle="What type of product do you want to build?"
      currentStep={4}
      totalSteps={4}
      footer={
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="outline"
            className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold flex-1"
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold flex-1"
            disabled={!value || loading}
            onClick={onGenerate}
          >
            {loading ? "Thinking…" : "Get my project"}
          </Button>
        </div>
      }
    >
      {/* Vertical scrollable chips */}
      <div
        className="
          flex flex-col
          gap-2 sm:gap-3
          max-h-[50vh]
          overflow-y-auto
          pr-1
          scrollbar-none
        "
      >
        {interests.map((i) => (
          <Chip
            key={i}
            active={value === i}
            onClick={() => onChange(i)}
            className="w-full justify-start"
          >
            {i}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
