import { levels } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";

export function DifficultyStep({ value, onChange, onBack, onNext }: any) {
  return (
    <StepLayout
      title="Choose difficulty"
      subtitle="How challenging should this project be?"
      currentStep={3}
      totalSteps={4}
      footer={
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold flex-1 transition-all" onClick={onBack}>Back</Button>
          <Button className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold flex-1 transition-all" disabled={!value} onClick={onNext}>Continue</Button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {levels.map((l) => (
          <Chip key={l} active={value === l} onClick={() => onChange(l)}>
            {l}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
